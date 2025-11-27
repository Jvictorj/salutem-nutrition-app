import { Component, OnInit } from '@angular/core';

import { ExerciciosService } from '../../service/services/exercicios.service';

@Component({
  selector: 'app-exercicio',
=======
import { YoutubeService } from '../../service/services/youtube.service'; // Certifique-se de que o caminho está correto

@Component({
  selector: 'app-exercicios',

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
=======
  videos: any[] = [];

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    const channelId = 'UCh__QxB4BrLCrw-Dp_SZh1g'; // Substitua pelo seu canal
    this.youtubeService.getVideosFromChannel(channelId).subscribe(
      (data: any) => {
        this.videos = data.items;
        console.log(this.videos);
      },
      (error) => {
        console.error('Erro ao buscar vídeos:', error);
      }
    );
  }

}
