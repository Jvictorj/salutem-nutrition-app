import { Injectable } from '@angular/core';

export interface ImcResult {
  imc: number;
  classificacao: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImcService {
  constructor() {}

  calcularIMC(peso: number, altura: number): ImcResult {
    if (!peso || !altura) {
      throw new Error('Peso e altura são obrigatórios.');
    }

    // Garante conversão para float e metros
    const alturaM = altura > 3 ? altura / 100 : altura; 
    const imc = peso / (alturaM * alturaM);
    const classificacao = this.obterClassificacao(imc);

    return { imc, classificacao };
  }

  private obterClassificacao(imc: number): string {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 24.9) return 'Peso normal';
    if (imc < 29.9) return 'Sobrepeso';
    if (imc < 34.9) return 'Obesidade grau 1';
    if (imc < 39.9) return 'Obesidade grau 2';
    return 'Obesidade grau 3';
  }
}