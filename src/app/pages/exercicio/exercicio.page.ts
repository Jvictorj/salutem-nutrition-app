import { Component, OnInit } from '@angular/core';
import { ExerciciosService } from '../../service/services/exercicios.service';

@Component({
  selector: 'app-exercicio',
  templateUrl: './exercicio.page.html',
  styleUrls: ['./exercicio.page.scss'],
})
export class ExerciciosPage implements OnInit {
  exercises: any[] = []; // Alterar para o tipo correto se você tiver uma interface
  videos: any[] = []; // Adicione seus vídeos aqui, se necessário

  constructor(private exerciciosService: ExerciciosService) {}

  ngOnInit() {
    this.exerciciosService.getExercicios().subscribe((res: any) => {
      this.exercises = res.results; // Ajuste conforme a estrutura da resposta
    });

    // Se você tiver um método para buscar vídeos, adicione aqui
    // this.loadVideos();
  }

  // Método exemplo para carregar vídeos (se necessário)
  // loadVideos() {
  //   // Lógica para buscar vídeos
  // }
}
