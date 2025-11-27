import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/user/auth.service'; // Caminho corrigido
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

interface UserProfile {
  photoUrl?: string; // Padronizado para photoUrl (consistente com profile.page.ts)
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  
  profilePicture: string = 'assets/icon/favicon.png'; // Fallback
  isUploading: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const user = await this.authService.getCurrentUser();
    if (user) {
      try {
        const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        if (userDoc && userDoc.exists) {
          const data = userDoc.data() as UserProfile;
          // Verifica se existe a foto, senão usa o padrão
          if (data.photoUrl) {
            this.profilePicture = data.photoUrl;
          }
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    }
  }

  // Aciona o input oculto
  selectImage() {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Validação simples de tamanho (ex: max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.showToast('A imagem é muito grande. Escolha uma menor que 5MB.', 'warning');
      return;
    }

    this.isUploading = true;
    const user = await this.authService.getCurrentUser();

    if (user) {
      // Cria um nome único para evitar cache
      const filePath = `avatars/${user.uid}/profile_${Date.now()}.jpg`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      // Observa o progresso e finalização
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async (url) => {
            this.profilePicture = url;
            
            // Atualiza no Firestore
            try {
              await this.firestore.collection('users').doc(user.uid).update({ 
                photoUrl: url // Garanta que o nome do campo é o mesmo usado no ProfilePage
              });
              this.showToast('Foto de perfil atualizada!', 'success');
            } catch (err) {
              console.error('Erro ao salvar URL:', err);
              this.showToast('Erro ao salvar a foto.', 'danger');
            } finally {
              this.isUploading = false;
            }
          });
        })
      ).subscribe({
        error: (err) => {
          console.error('Erro no upload:', err);
          this.isUploading = false;
          this.showToast('Falha no envio da imagem.', 'danger');
        }
      });
    } else {
      this.isUploading = false;
    }
  }

  async showToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}