import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';

interface UserProfile {
  profilePicture: string;
  // Adicione outras propriedades aqui conforme necessário
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profilePicture: string = ''; // URL da imagem de perfil
  avatarUrl: string = 'assets/avatar/default-avatar.PNG'; // URL da imagem padrão

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  // Método para carregar os dados do usuário
  async loadUserProfile() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
      if (userDoc && userDoc.exists) {
        const data = userDoc.data() as UserProfile;
        this.profilePicture = data.profilePicture || this.avatarUrl; // Carrega a imagem de perfil ou usa a imagem padrão
      }
    }
  }

  // Método para selecionar uma nova imagem
  selectImage() {
    const fileInput = document.querySelector('#fileInput') as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Método para lidar com o arquivo selecionado
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const user = await this.authService.getCurrentUser();
      if (user) {
        const filePath = `avatars/${user.uid}/${file.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        task.snapshotChanges().subscribe({
          next: (snapshot) => {
            // Você pode adicionar uma barra de progresso aqui, se quiser
          },
          complete: () => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.profilePicture = url; // Atualizando a variável profilePicture
              console.log('Imagem do avatar atualizada com sucesso');
              this.firestore.collection('users').doc(user.uid).update({ profilePicture: url });
            });
          },
          error: (err) => {
            console.error('Erro ao fazer upload da foto:', err);
          }
        });
      }
    }
  }
}
