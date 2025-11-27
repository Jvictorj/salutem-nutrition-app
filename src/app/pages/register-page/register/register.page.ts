import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'; // Verifique se o caminho está correto
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
  isDatePickerOpen = false;
  selectedDate: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Passo 1
    this.registerFormStep1 = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
    });

    // Passo 2
    this.registerFormStep2 = this.fb.group({
      gender: ['', Validators.required],
      dmy: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
    });
  }

  // Avançar etapa
  goToNextStep() {
    if (this.registerFormStep1.valid) {
      this.currentStep = 2;
    } else {
      console.log('Formulário da Etapa 1 é inválido');
      this.registerFormStep1.markAllAsTouched(); // Mostra erros visuais se houver
    }
  }

  // Controle de Senha
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Controle de Data
  openDatePicker() {
    this.isDatePickerOpen = true;
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
  }

  onDateSelected(event: any) {
    this.selectedDate = event.detail.value;
    this.registerFormStep2.controls['dmy'].setValue(this.selectedDate);
    this.closeDatePicker();
  }

  // Verifica se pode avançar
  isNextStepDisabled(): boolean {
    return !this.registerFormStep1.valid;
  }

  // Registro Final (Conectado ao Firebase/AuthService)
  async onRegister() {
    if (this.registerFormStep2.valid) {
      try {
        // Coletar todos os dados
        const { fullName, phoneNumber, email, password } = this.registerFormStep1.value;
        const { gender, dmy, weight, height } = this.registerFormStep2.value;
  
        // Enviar para o AuthService
        await this.authService.register(email, password, fullName, phoneNumber, gender, dmy, weight, height);
  
        // Redirecionar
        this.router.navigate(['/login']);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao registrar:', error.message);
          // Aqui você pode adicionar um Toast/Alert para avisar o usuário do erro
        } else {
          console.error('Erro desconhecido:', error);
        }
      }
    } else {
      console.log('Formulário da Etapa 2 é inválido');
    }
  }
}