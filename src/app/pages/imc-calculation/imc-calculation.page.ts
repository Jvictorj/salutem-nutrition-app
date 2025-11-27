import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

interface UserData {
  weight: number;
  height: number;
  dateOfBirth: string; // Formato ISO ou string de data
  gender: string;
}

@Component({
  selector: 'app-imc-calculation',
  templateUrl: './imc-calculation.page.html',
  styleUrls: ['./imc-calculation.page.scss'],
})
export class ImcCalculationPage implements OnInit {
  peso: number | null = null;
  altura: number | null = null;
  idade: number | null = null;
  sexo: string = '';
  
  pesoIdeal: number | null = null;
  resultadoIMC: { imc: number, classificacao: string } | null = null;
  resultadoMensagem: string = '';

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      this.loadUserData(user.uid);
    } else {
      // Se não estiver logado, pode redirecionar ou apenas deixar usar a calc vazia
      // this.router.navigate(['/login']); 
    }
  }

  async loadUserData(userId: string) {
    try {
      const doc = await this.firestore.collection('users').doc(userId).get().toPromise();
      
      if (doc && doc.exists) {
        const userData = doc.data() as UserData;
        
        if (userData) {
          if (userData.weight) this.peso = userData.weight;
          if (userData.height) this.altura = userData.height;
          if (userData.gender) this.sexo = userData.gender;
          if (userData.dateOfBirth) {
            this.idade = this.calculateAge(userData.dateOfBirth);
          }
          
          // Se já tiver dados suficientes, calcula automaticamente o ideal (opcional)
          if (this.altura && this.sexo) {
            this.calcularPesoIdeal();
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  }

  calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  calcularPesoIdeal() {
    if (this.altura && this.sexo) {
      // Fórmula de Devine (aproximada)
      // Homens: 50kg + 2.3kg por polegada acima de 5 pés
      // Mulheres: 45.5kg + 2.3kg por polegada acima de 5 pés
      // Altura base 5 pés = 152.4 cm
      
      const alturaBase = 152.4;
      const fatorPorPolegada = 2.3;
      const polegadaEmCm = 2.54;

      if (this.altura > alturaBase) {
        const diferencaAltura = this.altura - alturaBase;
        const polegadasAcima = diferencaAltura / polegadaEmCm;
        
        if (this.sexo === 'male') {
          this.pesoIdeal = 50 + (polegadasAcima * fatorPorPolegada);
        } else {
          this.pesoIdeal = 45.5 + (polegadasAcima * fatorPorPolegada);
        }
      } else {
        // Fallback simples para alturas menores
        this.pesoIdeal = this.sexo === 'male' ? 50 : 45.5; 
      }
    }
  }

  calcularIMC() {
    if (!this.peso || !this.altura) {
      // Aqui você pode mostrar um Toast de aviso se quiser
      return;
    }

    // Calcula Peso Ideal se ainda não calculou
    this.calcularPesoIdeal();

    const alturaMetros = this.altura / 100;
    const imc = this.peso / (alturaMetros * alturaMetros);
    const classificacao = this.obterClassificacaoTexto(imc);
    this.resultadoMensagem = this.obterMensagemFeedback(classificacao);

    this.resultadoIMC = { imc, classificacao };
  }

  obterClassificacaoTexto(imc: number): string {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 24.9) return 'Peso normal';
    if (imc < 29.9) return 'Sobrepeso';
    if (imc < 34.9) return 'Obesidade grau 1';
    if (imc < 39.9) return 'Obesidade grau 2';
    return 'Obesidade grau 3';
  }

  obterMensagemFeedback(classificacao: string): string {
    switch (classificacao) {
      case 'Peso normal':
        return 'Parabéns! Você está saudável. Continue assim!';
      case 'Abaixo do peso':
        return 'Seu peso está abaixo do recomendado. Procure orientação nutricional.';
      case 'Sobrepeso':
        return 'Atenção! Pequenas mudanças na dieta podem ajudar.';
      default:
        return 'Cuidado. É recomendado buscar acompanhamento médico.';
    }
  }

  // Retorna a classe CSS para cores dinâmicas
  obterClassificacaoCor(classificacao: string): string {
    switch (classificacao) {
      case 'Abaixo do peso': return 'classificacao-baixo';
      case 'Peso normal': return 'classificacao-normal';
      case 'Sobrepeso': return 'classificacao-sobrepeso';
      case 'Obesidade grau 1': return 'classificacao-obesidade1';
      case 'Obesidade grau 2': return 'classificacao-obesidade2';
      case 'Obesidade grau 3': return 'classificacao-obesidade3';
      default: return '';
    }
  }
}