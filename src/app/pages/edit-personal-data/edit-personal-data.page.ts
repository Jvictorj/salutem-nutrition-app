import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importar AngularFireAuth
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.page.html',
  styleUrls: ['./edit-personal-data.page.scss'],
})
export class EditPersonalDataPage implements OnInit {
  user: any = {};  // Contém os dados do usuário
  userAge: number = 0; // Variável para armazenar a idade

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth, // Usar o AngularFireAuth para acessar currentUser
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  // Método para carregar os dados do usuário
  async loadUserData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
      if (userDoc && userDoc.exists) {
        this.user = userDoc.data(); // Carrega os dados do usuário
        // Calcula a idade após carregar os dados
        this.userAge = this.calculateAge(this.user.dateOfBirth);
      } else {
        console.error("Usuário não encontrado");
      }
    } else {
      console.error("Usuário não autenticado");
    }
  }

  // Método para calcular a idade com base na data de nascimento
  calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);  // A data será corretamente convertida
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--; // Ajusta a idade se o aniversário ainda não aconteceu neste ano
    }
    return age;
  }

  // Método para atualizar os dados do usuário
  async updateUserData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      try {
        // Atualiza os dados no Firestore
        await this.firestore.collection('users').doc(userId).update({
          fullName: this.user.fullName,
          email: this.user.email,
          gender: this.user.gender,
          height: this.user.height,
          weight: this.user.weight,
          phoneNumber: this.user.phoneNumber,
          dateOfBirth: this.user.dateOfBirth, // Atualiza a data de nascimento
        });

        // Se a senha foi alterada, atualize também
        if (this.user.password) {
          const currentUser = await this.fireauth.currentUser;
          if (currentUser) {
            await currentUser.updatePassword(this.user.password); // Atualiza a senha
          }
        }

        // Se o email foi alterado, atualize também
        if (this.user.email !== user.email) {
          const currentUser = await this.fireauth.currentUser;
          if (currentUser) {
            await currentUser.updateEmail(this.user.email); // Atualiza o e-mail
          }
        }

        // Notifica o sucesso
        console.log("Dados atualizados com sucesso.");
        this.router.navigate(['/profile']);
      } catch (error) {
        console.error("Erro ao atualizar dados:", error);
      }
    } else {
      console.error("Usuário não autenticado");
    }
  }
}
