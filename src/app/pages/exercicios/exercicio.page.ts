import { Component, OnInit } from '@angular/core';
import { ExerciciosService } from '../../services/api/exercicios.service';
import { YoutubeService } from '../../services/api/youtube.service';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicio.page.html',
  styleUrls: ['./exercicio.page.scss'],
})
export class ExerciciosPage implements OnInit {

  // Filtro
  selectedFilter: string = 'all';

  // Dados Mockados para os Treinos (Baseados na imagem)
  allWorkouts = [
    {
      id: 1,
      type: 'fullbody',
      title: 'Treino de Corpo Inteiro',
      level: 'Iniciante',
      description: 'Treino completo para trabalhar todos os grupos musculares.',
      exerciseCount: 11,
      duration: 32,
      iconName: 'body-outline' // Fallback
    },
    {
      id: 2,
      type: 'lower',
      title: 'Treino Inferior do Corpo',
      level: 'Intermediário',
      description: 'Foco em pernas e glúteos para ganho de força.',
      exerciseCount: 12,
      duration: 40,
      iconName: 'walk-outline'
    },
    {
      id: 3,
      type: 'upper',
      title: 'Treino Superior',
      level: 'Iniciante',
      description: 'Foco em braços, peito e costas.',
      exerciseCount: 10,
      duration: 25,
      iconName: 'barbell-outline'
    }
  ];

  filteredWorkouts: any[] = [];
  videos: any[] = [];

  constructor(
    private exerciciosService: ExerciciosService,
    private youtubeService: YoutubeService
  ) {}

  ngOnInit() {
    this.filterWorkouts(); // Carrega lista inicial
    this.carregarVideosYoutube();
  }

  filterWorkouts() {
    if (this.selectedFilter === 'all') {
      this.filteredWorkouts = this.allWorkouts;
    } else {
      this.filteredWorkouts = this.allWorkouts.filter(w => w.type === this.selectedFilter);
    }
  }

  carregarVideosYoutube() {
    const channelId = 'UCh__QxB4BrLCrw-Dp_SZh1g'; // Seu canal ID
    this.youtubeService.getVideosFromChannel(channelId).subscribe(
      (data: any) => {
        this.videos = data.items || [];
      },
      (error: any) => {
        console.error('Erro Youtube:', error);
      }
    );
  }

  openVideo(video: any) {
    window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank');
  }
}