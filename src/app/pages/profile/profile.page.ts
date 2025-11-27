import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

interface UserData {
  fullName?: string;
  email?: string;
  height?: number;
  weight?: number;
  dateOfBirth?: string;
  photoUrl?: string;
  gender?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  user: UserData = {};
  userAge: number | string = '--';
  userIMC: number | null = null;
  userIMCClass: string = '';
  
  profilePicture: string = 'assets/icon/favicon.png'; // Fallback
  notificationsEnabled: boolean = true;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      this.loadUserData(currentUser.uid, currentUser.email);
    } else {
      this.router.navigate(['/login']);
    }
  }

  async loadUserData(uid: string, email: string | null) {
    try {
      const doc = await this.firestore.collection('users').doc(uid).get().toPromise();
      
      if (doc && doc.exists) {
        this.user = doc.data() as UserData;
        this.user.email = email || ''; // Garante que o email vem do Auth se não tiver no banco

        // Processar Avatar
        if (this.user.photoUrl) {
          this.profilePicture = this.user.photoUrl;
        }

        // Processar Idade
        if (this.user.dateOfBirth) {
          this.userAge = this.calculateAge(this.user.dateOfBirth);
        }

        // Calcular IMC para o Card
        if (this.user.height && this.user.weight) {
          this.calculateIMC(this.user.weight, this.user.height);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  }

  calculateAge(dateString: string): number {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  calculateIMC(weight: number, heightCm: number) {
    const heightM = heightCm / 100;
    this.userIMC = weight / (heightM * heightM);
    
    // Classificação simples para o card
    if (this.userIMC < 18.5) this.userIMCClass = 'Abaixo do peso';
    else if (this.userIMC < 24.9) this.userIMCClass = 'Peso normal';
    else if (this.userIMC < 29.9) this.userIMCClass = 'Sobrepeso';
    else this.userIMCClass = 'Obesidade';
  }

  // Upload de Imagem
  async uploadProfileImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const user = await this.authService.getCurrentUser();
    if (!user) return;

    const filePath = `users/${user.uid}/profile_${Date.now()}.jpg`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Observa o progresso/finalização
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.profilePicture = url;
          // Salva URL no Firestore
          this.firestore.collection('users').doc(user.uid).update({ photoUrl: url });
        });
      })
    ).subscribe();
  }

  // Navegação
  goToEditPersonalData() {
    this.router.navigate(['/edit-personal-data']); // Crie esta rota depois se não existir
  }

  goToIMCCalculation() {
    this.router.navigate(['/imc-calculation']);
  }

  async logOut() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}