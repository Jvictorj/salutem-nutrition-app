import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged, User } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';
  avatarUrl: string = 'assets/icon/favicon.png'; // Fallback se não tiver foto

  // Dias abreviados para caber no layout mobile
  weekDays = [
    { value: 'segunda', label: 'SEG' },
    { value: 'terca', label: 'TER' },
    { value: 'quarta', label: 'QUA' },
    { value: 'quinta', label: 'QUI' },
    { value: 'sexta', label: 'SEX' },
    { value: 'sabado', label: 'SÁB' },
    { value: 'domingo', label: 'DOM' },
  ];
  selectedDay: string = '';

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.setupUser();
    this.setupDay();
  }

  setupUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // 1. Tenta pegar o nome do Auth do Google/Firebase
        this.userName = user.displayName || '';

        // 2. Se não tiver, busca no Firestore
        if (!this.userName) {
          this.firestore.collection('users').doc(user.uid).get().subscribe((doc: any) => {
            if (doc.exists) {
              const data = doc.data();
              this.userName = data?.fullName || 'Usuário';
            }
          });
        }
        
        // 3. Tenta carregar avatar personalizado (se existir lógica para isso)
        // this.loadUserAvatar(user.uid);
      } else {
        this.userName = 'Visitante';
      }
    });
  }

  setupDay() {
    const days = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const todayIndex = new Date().getDay();
    this.selectedDay = days[todayIndex];
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToExercicio() {
    this.router.navigate(['/exercicio']);
  }

  goToNutriente() {
    this.router.navigate(['/nutriente-track']);
  }

  // Mantive a lógica de upload caso queira usar no futuro (no perfil, por exemplo)
  onFileSelected(event: any) {
    // ... lógica de upload
  }
}