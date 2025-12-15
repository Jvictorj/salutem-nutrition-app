import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/user/auth.service'; // Verifique seu caminho
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {
  currentStep = 1;
  registerFormStep1: FormGroup;
  registerFormStep2: FormGroup;
  showPassword = false;
  
  
  // Variáveis para a data
  selectedDateDisplay: string | null = null; // O que aparece para o usuário (DD/MM/YYYY)
   maxBirthDate!: string;

  constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router
) {
  // Limite de idade mínima (13 anos)
  const today = new Date();
  today.setFullYear(today.getFullYear() - 13);
  this.maxBirthDate = today.toISOString();

  // Formulário Passo 1
  this.registerFormStep1 = this.fb.group({
    fullName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    acceptTerms: [false, Validators.requiredTrue],
  });

  // Formulário Passo 2
  this.registerFormStep2 = this.fb.group({
    gender: ['', Validators.required],
    birthDate: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(1)]],
    height: ['', [Validators.required, Validators.min(1)]],
  });
}

  // Alternar visibilidade da senha
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Avançar para o Passo 2
  goToNextStep() {
    if (this.registerFormStep1.valid) {
      this.currentStep = 2;
    } else {
      this.registerFormStep1.markAllAsTouched(); // Mostra erros se houver
    }
  }

  // Quando o usuário seleciona uma data no modal
  onDateSelected(event: any) {
    const isoDate = event.detail.value;
    if (isoDate) {
      // 1. Salva no formulário (formato ISO para o banco de dados)
      this.registerFormStep2.get('birthDate')?.setValue(isoDate);

      // 2. Formata para exibir bonito (DD/MM/AAAA)
      const dateObj = new Date(isoDate);
      this.selectedDateDisplay = dateObj.toLocaleDateString('pt-BR');
    }
  }

  // Enviar Cadastro
    async onRegister() {
    if (this.registerFormStep2.valid) {
      try {
        const step1 = this.registerFormStep1.value;
        const step2 = this.registerFormStep2.value;

        // Cria o objeto organizado
        const userData = {
          email: step1.email,
          fullName: step1.fullName,
          phoneNumber: step1.phoneNumber,
          gender: step2.gender,
          dateOfBirth: step2.birthDate,
          weight: step2.weight,
          height: step2.height,
          // photoUrl: '' // Opcional, pode vir vazio
        };

        // Passa o objeto + a senha separada
        await this.authService.register(userData, step1.password);

        console.log('Registro completo!');
        this.router.navigate(['/home']);
        
      } catch (error: any) {
        // Agora o error.message virá em Português traduzido pelo serviço!
        console.error(error);
        // Pode exibir um Toast aqui com error.message
      }
    }
  }
}