import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefeicaoService {
  refeicoes: any = {};

  constructor() {}

  // Adicionar alimento à refeição específica
  addAlimento(nomeRefeicao: string, alimento: any) {
    if (!this.refeicoes[nomeRefeicao]) {
      this.refeicoes[nomeRefeicao] = [];
    }
    this.refeicoes[nomeRefeicao].push(alimento);
    console.log(`Alimento adicionado à refeição ${nomeRefeicao}`);
  }

  // Obter alimentos de uma refeição
  getAlimentos(nomeRefeicao: string) {
    return this.refeicoes[nomeRefeicao] || [];
  }
}
