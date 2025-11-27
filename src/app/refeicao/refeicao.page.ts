import { Component, OnInit } from '@angular/core';
import { RefeicaoService } from '../services/refeicao.service'; // Certifique-se de que o serviço esteja correto

@Component({
  selector: 'app-refeicao',
  templateUrl: './refeicao.page.html',
  styleUrls: ['./refeicao.page.scss'],
})
export class RefeicaoPage implements OnInit {
  alimentos: any[] = [];

  constructor(private refeicaoService: RefeicaoService) {}

  ngOnInit() {
    // Carregar os alimentos de uma refeição específica (exemplo: "Café da Manhã")
    this.alimentos = this.refeicaoService.getAlimentos('Café da Manhã');
  }
}
