import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged, User } from '@angular/fire/auth'; // Importando User
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importando AngularFirestore
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Importando AngularFireStorage

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';
  avatarUrl: string = 'assets/avatar/default-avatar.PNG'; // URL padrão para o avatar
  weekDays = [
    { value: 'domingo', label: 'Domingo' },
    { value: 'segunda', label: 'Segunda-feira' },
    { value: 'terca', label: 'Terça-feira' },
    { value: 'quarta', label: 'Quarta-feira' },
    { value: 'quinta', label: 'Quinta-feira' },
    { value: 'sexta', label: 'Sexta-feira' },
    { value: 'sabado', label: 'Sábado' },
  ];
  selectedDay: string = '';

  constructor(
    private router: Router,
    private firestore: AngularFirestore, // Injetando o serviço AngularFirestore
    private storage: AngularFireStorage // Injetando o serviço AngularFireStorage
  ) {}

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        this.userName = user.displayName || '';
        if (!this.userName) {
          this.firestore
            .collection('users')
            .doc(user.uid)
            .get()
            .subscribe((doc) => {
              if (doc.exists) {
                const userData = doc.data() as { fullName: string };
                this.userName = userData.fullName || '';
              } else {
                console.log('Documento do usuário não encontrado.');
              }
            });
        }
      } else {
        console.log('Usuário não autenticado');
      }
    });

    const today = new Date();
    const currentDay = today.getDay();
    this.selectedDay = this.weekDays[currentDay].value;
  }

  selectDay(day: any) {
    console.log('Dia selecionado:', day);
    this.selectedDay = day.value;
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

  onAdd() {
    console.log('Adicionar refeição');
  }

  // Método para lidar com a seleção de arquivo
  onFileSelected(event: any) {
    const file = event.target.files[0]; // Pegando o primeiro arquivo selecionado
    if (file) {
      const filePath = `avatars/${file.name}`; // Caminho do arquivo no Firebase Storage
      const fileRef = this.storage.ref(filePath); // Referência para o arquivo no Firebase Storage
      const task = this.storage.upload(filePath, file); // Fazendo o upload do arquivo

      task.snapshotChanges().subscribe(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          // Atualizando o URL da imagem após o upload
          this.avatarUrl = url;
          console.log('Imagem do avatar atualizada com sucesso');
        });
      });
    }
  }
}
