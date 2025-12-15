import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type TipoRefeicao =
  | 'Café da Manhã'
  | 'Almoço'
  | 'Jantar'
  | 'Lanche';

@Injectable({
  providedIn: 'root',
})
export class RefeicaoService {

  private refeicoesSubject = new BehaviorSubject<Record<TipoRefeicao, any[]>>({
    'Café da Manhã': [],
    'Almoço': [],
    'Jantar': [],
    'Lanche': [],
  });

  refeicoes$ = this.refeicoesSubject.asObservable();

  addAlimento(refeicao: TipoRefeicao, alimento: any) {
    const atual = this.refeicoesSubject.value;

    atual[refeicao] = [...atual[refeicao], alimento];

    this.refeicoesSubject.next({ ...atual });
  }

  removerAlimento(refeicao: TipoRefeicao, index: number) {
    const atual = this.refeicoesSubject.value;

    atual[refeicao].splice(index, 1);
    this.refeicoesSubject.next({ ...atual });
  }

  getAlimentos(refeicao: TipoRefeicao): any[] {
    return this.refeicoesSubject.value[refeicao];
  }

  getResumoDiario() {
  const refeicoes = this.refeicoesSubject.value;

  let total = {
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0
  };

  Object.values(refeicoes).forEach((lista: any[]) => {
    lista.forEach(alimento => {
      total.calories += alimento.energy_kcal || 0;
      total.carbs += alimento.carbohydrate_g || 0;
      total.protein += alimento.protein_g || 0;
      total.fat += alimento.lipid_g || 0;
    });
  });

  return total;
}

}
