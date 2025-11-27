import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
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
  selectedDate: string | null = null; // Armazena a data selecionada

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Formulário para o Passo 1
    this.registerFormStep1 = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
    });

    // Formulário para o Passo 2
    this.registerFormStep2 = this.fb.group({
      gender: ['', Validators.required],
      dmy: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
    });
  }

<<<<<<< HEAD
  // Função para ir para o próximo passo
  goToNextStep() {
    if (this.registerFormStep1.valid) {
      this.currentStep = 2;
    } else {
      console.log('Formulário da Etapa 1 é inválido');
    }
  }

  // Função para finalizar o registro
  onRegister() {
    if (this.registerFormStep2.valid) {
      const fullRegistrationData = {
        ...this.registerFormStep1.value,
        ...this.registerFormStep2.value,
      };
      console.log('Dados Completos de Registro:', fullRegistrationData);

      // Redireciona para a página principal após o registro
      this.router.navigate(['/login']);
    } else {
      console.log('Formulário da Etapa 2 é inválido');
    }
  }
  
  // Função para alternar a visibilidade da senha
=======
>>>>>>> final-V2
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

<<<<<<< HEAD
  // Controle do modal de data
  openDatePicker() {
    this.isDatePickerOpen = true;
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
  }

  onDateSelected(event: any) {
    this.selectedDate = event.detail.value; // Pega a data selecionada
    this.registerFormStep2.controls['dmy'].setValue(this.selectedDate);
    this.closeDatePicker(); // Fecha o modal após a seleção
  }

  // Função auxiliar para determinar se os botões "Próximo" e "Registrar" devem estar habilitados
  isNextStepDisabled(): boolean {
    return !this.registerFormStep1.valid;
=======
  goToNextStep() {
    if (this.registerFormStep1.valid) {
      this.currentStep = 2;
    }
>>>>>>> final-V2
  }

  async onRegister() {
    if (this.registerFormStep2.valid) {
      try {
        // Coletar todos os dados do formulário
        const { fullName, phoneNumber, email, password } = this.registerFormStep1.value;
        const { gender, dmy, weight, height } = this.registerFormStep2.value;
  
        // Enviar para o AuthService para registrar o usuário
        await this.authService.register(email, password, fullName, phoneNumber, gender, dmy, weight, height);
  
        // Redirecionar após o registro bem-sucedido
        this.router.navigate(['/login']);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao registrar:', error.message);
        } else {
          console.error('Erro desconhecido:', error);
        }
      }
    }
  }
  
}
