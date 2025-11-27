import { Component } from '@angular/core';
import { AuthService } from '../../../services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = '';
  senha: string = '';
  passwordVisible: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async login() {
    // Validação básica antes de chamar o serviço
    if (!this.email || !this.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    try {
      this.errorMessage = ''; // Limpa erros anteriores
      await this.authService.login(this.email, this.senha);
      console.log('Login bem-sucedido!');
      this.router.navigate(['/home']);
    } catch (error: any) {
      // Tratamento de mensagens de erro amigáveis
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
         this.errorMessage = 'E-mail ou senha incorretos.';
      } else if (error.code === 'auth/invalid-email') {
         this.errorMessage = 'Formato de e-mail inválido.';
      } else {
         this.errorMessage = error.message || 'Erro ao fazer login. Tente novamente.';
      }
      console.error('Erro ao fazer login:', error);
    }
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  loginWithGoogle() {
    console.log('Login com Google - Implementar lógica futura');
    // this.authService.loginWithGoogle()...
  }

  loginWithFacebook() {
    console.log('Login com Facebook - Implementar lógica futura');
    // this.authService.loginWithFacebook()...
  }
}