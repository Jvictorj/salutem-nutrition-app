import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefeicaoService {
  
  // Estado inicial das refeições
  private refeicoesSubject = new BehaviorSubject<any>({
    'Café da Manhã': [],
    'Almoço': [],
    'Jantar': [],
    'Lanche': []
  });

  // O mundo externo só vê o Observable (apenas leitura)
  public refeicoes$ = this.refeicoesSubject.asObservable();

  constructor() {}

  addAlimento(nomeRefeicao: string, alimento: any) {
    const valorAtual = this.refeicoesSubject.value;
    
    if (!valorAtual[nomeRefeicao]) {
      valorAtual[nomeRefeicao] = [];
    }

    // Adiciona o novo item
    valorAtual[nomeRefeicao].push(alimento);

    // Emite o novo valor para todo o app
    this.refeicoesSubject.next({ ...valorAtual });
    
    console.log(`Refeição atualizada:`, valorAtual);
  }

  // Retorna todas as refeições de uma vez
  getRefeicoesAtuais() {
    return this.refeicoesSubject.value;
  }

  // CORREÇÃO: Método adicionado para compatibilidade com seu código antigo
  getAlimentos(nomeRefeicao: string) {
    return this.refeicoesSubject.value[nomeRefeicao] || [];
  }
}