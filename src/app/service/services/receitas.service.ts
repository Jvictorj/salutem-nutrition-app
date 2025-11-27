// src/app/services/receitas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  private apiKey = '6152f98c0ed94ef19119a6930936c619'; // Coloque a chave da API da Spoonacular ou qualquer outra API que você esteja usando
  private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch'; // Endpoint para buscar receitas

  constructor(private http: HttpClient) {}

  // Função para buscar receitas
  getReceitas(query: string): Observable<any> {
    const params = {
      apiKey: this.apiKey,
      query: query,
      number: '10', // Limitar a quantidade de receitas retornadas
    };
    return this.http.get<any>(this.apiUrl, { params });
  }
}
