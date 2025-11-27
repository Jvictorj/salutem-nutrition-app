import { Component, OnInit } from '@angular/core';
import { ExerciciosService } from '../../service/services/exercicios.service';
import { YoutubeService } from '../../service/services/youtube.service'; // Ajuste o caminho se necessário

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicio.page.html',
  styleUrls: ['./exercicio.page.scss'],
})
export class ExerciciosPage implements OnInit {

  exercises: any[] = [];
  videos: any[] = [];

  // Injetamos AMBOS os serviços no mesmo construtor
  constructor(
    private exerciciosService: ExerciciosService,
    private youtubeService: YoutubeService
  ) {}

  ngOnInit() {
    this.carregarExercicios();
    this.carregarVideosYoutube();
  }

  carregarExercicios() {
    this.exerciciosService.getExercicios().subscribe(
      (res: any) => {
        // Verifica se res.results existe antes de atribuir para evitar erros
        if (res && res.results) {
          this.exercises = res.results;
        } else {
          this.exercises = res; // Caso a API retorne o array direto
        }
      },
      (error: any) => {
        console.error('Erro ao carregar exercícios:', error);
      }
    );
  }

  carregarVideosYoutube() {
    const channelId = 'UCh__QxB4BrLCrw-Dp_SZh1g'; // Seu canal
    
    this.youtubeService.getVideosFromChannel(channelId).subscribe(
      (data: any) => {
        this.videos = data.items;
        console.log('Vídeos carregados:', this.videos);
      },
      (error: any) => { // Tipagem explícita para resolver o erro 'implicitly has an any type'
        console.error('Erro ao buscar vídeos do YouTube:', error);
      }
    );
  }
}