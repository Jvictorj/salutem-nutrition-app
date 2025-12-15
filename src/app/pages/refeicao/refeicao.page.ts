import { Component, OnInit } from '@angular/core';
import { RefeicaoService, TipoRefeicao } from '../../services/user/refeicao.service';

@Component({
  selector: 'app-refeicao',
  templateUrl: './refeicao.page.html',
  styleUrls: ['./refeicao.page.scss'],
})
export class RefeicaoPage implements OnInit {

  refeicaoSelecionada: TipoRefeicao = 'Café da Manhã';
  alimentos: any[] = [];

  constructor(private refeicaoService: RefeicaoService) {}

  ngOnInit() {
    this.carregarAlimentos();
  }

  carregarAlimentos() {
    this.alimentos = this.refeicaoService.getAlimentos(this.refeicaoSelecionada);
  }

  trocarRefeicao(refeicao: TipoRefeicao) {
    this.refeicaoSelecionada = refeicao;
    this.carregarAlimentos();
  }

  remover(index: number) {
    this.refeicaoService.removerAlimento(this.refeicaoSelecionada, index);
    this.carregarAlimentos();
  }
}
