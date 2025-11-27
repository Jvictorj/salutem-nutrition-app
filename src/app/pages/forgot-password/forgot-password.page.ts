import { Component } from '@angular/core';
import { AuthService } from '../../services/user/auth.service'; // Caminho corrigido
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  
  email: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async sendResetLink() {
    if (!this.email) return;

    this.isLoading = true;

    try {
      await this.authService.sendPasswordReset(this.email);
      await this.showToast('Link enviado! Verifique seu e-mail.', 'success');
      
      // Opcional: Voltar para o login após alguns segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

    } catch (error: any) {
      console.error('Erro ao enviar link:', error);
      
      let msg = 'Erro ao enviar o link. Tente novamente.';
      if (error.code === 'auth/user-not-found') msg = 'E-mail não encontrado.';
      if (error.code === 'auth/invalid-email') msg = 'Formato de e-mail inválido.';

      await this.showToast(msg, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async showToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color,
      position: 'bottom',
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    toast.present();
  }
}