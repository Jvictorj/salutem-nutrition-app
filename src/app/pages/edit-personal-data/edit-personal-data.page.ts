import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service'; // Caminho corrigido
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.page.html',
  styleUrls: ['./edit-personal-data.page.scss'],
})
export class EditPersonalDataPage implements OnInit {
  
  user: any = {};
  isLoading: boolean = false; // Controle para o botão de salvar

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      try {
        const doc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        if (doc && doc.exists) {
          this.user = doc.data();
          // Garante que o email vem do Auth se não tiver no banco (segurança)
          this.user.email = user.email;
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  calculateAge(dateString: string): number {
    if (!dateString) return 0;
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  async updateUserData() {
    this.isLoading = true; // Ativa loading
    const currentUser = await this.authService.getCurrentUser();

    if (currentUser) {
      try {
        // 1. Atualizar Firestore
        const age = this.calculateAge(this.user.dateOfBirth);
        
        await this.firestore.collection('users').doc(currentUser.uid).update({
          fullName: this.user.fullName,
          gender: this.user.gender,
          height: this.user.height,
          weight: this.user.weight,
          phoneNumber: this.user.phoneNumber,
          dateOfBirth: this.user.dateOfBirth,
          age: age // Salva a idade calculada
        });

        // 2. Atualizar Senha (Se preenchida)
        if (this.user.password && this.user.password.length >= 6) {
          const fireUser = await this.fireauth.currentUser;
          if (fireUser) await fireUser.updatePassword(this.user.password);
        }

        // 3. Atualizar Email (Se alterado)
        if (this.user.email && this.user.email !== currentUser.email) {
          const fireUser = await this.fireauth.currentUser;
          if (fireUser) await fireUser.updateEmail(this.user.email);
        }

        this.showToast('Dados atualizados com sucesso!', 'success');
        this.router.navigate(['/profile']);

      } catch (error: any) {
        console.error("Erro ao atualizar:", error);
        this.showToast('Erro ao atualizar: ' + error.message, 'danger');
      } finally {
        this.isLoading = false; // Desativa loading
      }
    } else {
      this.isLoading = false;
    }
  }

  async showToast(msg: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}