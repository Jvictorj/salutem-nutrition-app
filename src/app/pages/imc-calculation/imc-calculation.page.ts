import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

interface UserData {
  weight: number;
  height: number;
  dateOfBirth: string;
  gender: string;
}

@Component({
  selector: 'app-imc-calculation',
  templateUrl: './imc-calculation.page.html',
  styleUrls: ['./imc-calculation.page.scss'],
})
export class ImcCalculationPage implements OnInit {
  peso!: number;
  altura!: number;
  idade!: number;
  sexo!: string;
  pesoIdeal!: number;
  resultadoIMC!: { imc: number, classificacao: string };
  resultadoMensagem!: string;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  // Verificar se o usuário está autenticado
  async checkAuthentication() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      // Usuário autenticado, carrega os dados
      this.loadUserData();
    } else {
      // Usuário não autenticado, redireciona para a página de login
      this.router.navigate(['/login']);
    }
  }

  // Método para carregar os dados do usuário
  async loadUserData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
      
      // Verificar se o documento existe antes de acessar os dados
      if (userDoc && userDoc.exists) {
        const userData = userDoc.data() as UserData; // Aqui estamos fazendo o cast para UserData
        
        // Verificar se userData contém os dados necessários
        if (userData && userData.weight && userData.height && userData.dateOfBirth && userData.gender) {
          this.peso = userData.weight;
          this.altura = userData.height;
          this.idade = this.calculateAge(userData.dateOfBirth); // Calcula a idade
          this.sexo = userData.gender;
          this.calcularPesoIdeal(); // Calcula o peso ideal
        } else {
          console.error('Dados do usuário incompletos ou inválidos');
        }
      } else {
        console.error('Usuário não encontrado no Firestore');
      }
    } else {
      console.error('Usuário não autenticado');
    }
  }

  // Método para calcular a idade com base na data de nascimento
  calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--; // Ajusta a idade se o aniversário ainda não aconteceu neste ano
    }
    return age;
  }

  // Método para calcular o peso ideal
  calcularPesoIdeal() {
    if (this.altura && this.sexo) {
        console.log(`Calculando peso ideal para altura: ${this.altura}, sexo: ${this.sexo}`);
        const alturaEmCm = this.altura; // A altura já está em cm
        if (this.sexo === 'male') {
            this.pesoIdeal = 50 + 2.3 * (alturaEmCm - 152.4) / 2.54; // Fórmula para homens
        } else if (this.sexo === 'female') {
            this.pesoIdeal = 45.5 + 2.3 * (alturaEmCm - 152.4) / 2.54; // Fórmula para mulheres
        } else {
            console.error(`Sexo desconhecido: ${this.sexo}`);
        }
        console.log(`Peso ideal calculado: ${this.pesoIdeal}`);
    }
  }

  // Método para calcular o IMC
  calcularIMC() {
    if (!this.peso || !this.altura) {
      console.error('Peso e altura são obrigatórios para calcular o IMC.');
      return;
    }
  
    const alturaEmMetros = this.altura / 100; // Converter altura para metros
    const imc = this.peso / (alturaEmMetros * alturaEmMetros);
    const { classificacao, mensagem } = this.obterClassificacao(imc);
  
    this.resultadoIMC = { imc, classificacao };
    this.resultadoMensagem = mensagem; // Nova propriedade para a mensagem
  }
  
  // Método para classificar o IMC
  private obterClassificacao(imc: number): { classificacao: string, mensagem: string } {
    if (imc < 18.5) {
      return {
        classificacao: 'Abaixo do peso',
        mensagem: 'Seu IMC está abaixo do peso ideal. Isso pode indicar desnutrição ou outros problemas de saúde. Considere consultar um nutricionista ou médico para avaliação.',
      };
    } else if (imc >= 18.5 && imc < 24.9) {
      return {
        classificacao: 'Peso normal',
        mensagem: 'Parabéns! Seu IMC está dentro do intervalo considerado saudável pela OMS. Mantenha hábitos saudáveis para continuar assim.',
      };
    } else if (imc >= 25 && imc < 29.9) {
      return {
        classificacao: 'Sobrepeso',
        mensagem: 'Seu IMC indica sobrepeso. Isso pode ser um sinal para adotar hábitos mais saudáveis, como melhorar sua alimentação e praticar exercícios físicos.',
      };
    } else if (imc >= 30 && imc < 34.9) {
      return {
        classificacao: 'Obesidade grau 1',
        mensagem: 'Seu IMC está na faixa de obesidade grau 1. É importante agir para evitar complicações de saúde. Procure orientação médica ou nutricional.',
      };
    } else if (imc >= 35 && imc < 39.9) {
      return {
        classificacao: 'Obesidade grau 2',
        mensagem: 'Seu IMC indica obesidade grau 2, que pode trazer riscos significativos à saúde. Recomenda-se buscar acompanhamento profissional.',
      };
    } else {
      return {
        classificacao: 'Obesidade grau 3',
        mensagem: 'Seu IMC está na faixa de obesidade grau 3 (obesidade mórbida). Esta é uma condição séria que exige atenção médica imediata.',
      };
    }
  }

  // Método para obter a classe de cor da classificação do IMC
  obterClassificacaoCor(classificacao: string): string {
    switch (classificacao) {
      case 'Abaixo do peso':
        return 'classificacao-baixo';
      case 'Peso normal':
        return 'classificacao-normal';
      case 'Sobrepeso':
        return 'classificacao-sobrepeso';
      case 'Obesidade grau 1':
        return 'classificacao-obesidade1';
      case 'Obesidade grau 2':
        return 'classificacao-obesidade2';
      case 'Obesidade grau 3':
        return 'classificacao-obesidade3';
      default:
        return '';
    }
  }

  // Tornar este método público para acesso no template
  public obterClasseFeedback(classificacao: string): string {
    if (classificacao === 'Peso normal') {
      return 'feedback-normal';
    } else if (classificacao === 'Abaixo do peso') {
      return 'feedback-baixo';
    } else if (classificacao.includes('Obesidade')) {
      return 'feedback-obesidade';
    } else {
      return 'feedback-sobrepeso';
    }
  }  
}
