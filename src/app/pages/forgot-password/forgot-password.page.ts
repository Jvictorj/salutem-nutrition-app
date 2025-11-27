import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(private authService: AuthService) {}

  sendResetLink() {
    this.authService.sendPasswordReset(this.email).then(() => {
      alert('Link para redefinição de senha enviado!');
    }).catch((error) => {
      console.error('Erro ao enviar o link', error);
    });
  }
}
