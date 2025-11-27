import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NutrienteService {
  private jsonFilePath = 'assets/dados/tabela_alimentos.json'; // Caminho do arquivo JSON

  constructor(private http: HttpClient) {}

  // Método para obter todos os alimentos
  getAllAlimentos(): Observable<any> {
    return this.http.get<any>(this.jsonFilePath);
  }

  // Método para buscar alimentos por descrição
  getAlimentoByName(searchQuery: string): Observable<any> {
    return new Observable((observer) => {
      this.getAllAlimentos().subscribe((data) => {
        const result = data.filter((item: any) =>
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        observer.next(result);
        observer.complete();
      });
    });
  }
}
