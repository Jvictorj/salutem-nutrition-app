import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
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
  errorMessage: string = ''; // Para mostrar a mensagem de erro no template

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async login() {
    try {
      await this.authService.login(this.email, this.senha);
      console.log('Login bem-sucedido!');
      this.router.navigate(['/home']); // Redireciona após login bem-sucedido
    } catch (error: any) {
      this.errorMessage = error.message; // Armazena o erro para exibir no template
      console.error('Erro ao fazer login:', error.message); // Exibe erro detalhado no console
    }
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  loginWithGoogle() {
    // Lógica de login com Google
    console.log('Login com Google');
  }

  loginWithFacebook() {
    // Lógica de login com Facebook
    console.log('Login com Facebook');
  }

  register() {
    // Redireciona para a página de registro
    console.log('Redirecionando para a página de registro...');
  }
}
