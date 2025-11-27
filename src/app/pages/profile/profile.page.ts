import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';



import { ImcService } from 'src/app/services/imc.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {}; // Dados do usuário
  notificationsEnabled: boolean = true;
  userAge: number = 0; // Variável para armazenar a idade
  profilePicture: string = ''; // URL da imagem de perfil
  avatarUrl: string = 'assets/avatar/default-avatar.PNG'; // URL da imagem padrão

  peso!: number; // Peso do usuário
  altura!: number; // Altura do usuário
  resultadoIMC!: { imc: number, classificacao: string };


  

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
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
        this.user = userDoc.data(); // Dados do usuário
        this.profilePicture = this.user.photoUrl || this.avatarUrl; // Carrega a imagem de perfil, se houver
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
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--; // Ajusta a idade se o aniversário ainda não aconteceu neste ano
    }
    return age;
  }

  // Método para editar o perfil
  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  // Método para atualizar os dados do usuário
  async updateUserData() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      try {
        await this.firestore.collection('users').doc(userId).update({
          height: this.user.height,
          weight: this.user.weight,
          age: this.userAge, // Atualizando a idade também
          fullName: this.user.fullName,
        });
      } catch (error) {
        console.error("Erro ao atualizar dados:", error);
      }
    } else {
      console.error("Usuário não autenticado");
    }
  }

  // Método para fazer upload da imagem de perfil
  async uploadProfileImage(event: any) {
    const file = event.target.files[0];
    if (!file) {
      console.error("Nenhum arquivo selecionado");
      return;
    }

    const user = await this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      const filePath = `users/${userId}/profile.jpg`; // O caminho onde a imagem será armazenada no Firebase Storage
      const fileRef = this.storage.ref(filePath);
      
      // Primeiro, faz o upload do arquivo
      const task = this.storage.upload(filePath, file);

      // Espera o upload terminar antes de obter a URL
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url: string) => {
            this.profilePicture = url;
            this.user.photoUrl = url;
            
            // Atualizar o Firestore com o URL da imagem de perfil
            this.firestore.collection('users').doc(userId).update({
              photoUrl: url
            }).then(() => {
              console.log("URL da imagem de perfil atualizada com sucesso.");
            }).catch((error) => {
              console.error("Erro ao atualizar URL no Firestore:", error);
            });
          }, error => {
            console.error("Erro ao obter a URL da imagem:", error);
          });
        })
      ).subscribe();
      

    } else {
      console.error("Usuário não autenticado");
    }
  }


  // Método para ir para a página de perfil
  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToIMCCalculation() {
    this.router.navigate(['/imc-calculation']);
  }  

  // Método para ir para a página de edição de dados pessoais
  goToEditPersonalData() {
    this.router.navigate(['/edit-personal-data']);
  }

  // LogOut
  async logOut() {
    await this.authService.logout();  // Faz logout
    this.router.navigate(['/login']);  // Redireciona para a tela de login
  }
}
