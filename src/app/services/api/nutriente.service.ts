import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NutrienteService {
  private jsonFilePath = 'assets/dados/tabela_alimentos.json';

  // cache da tabela inteira
  private alimentos$?: Observable<any[]>;

  constructor(private http: HttpClient) {}

  getAllAlimentos(): Observable<any[]> {
    if (!this.alimentos$) {
      this.alimentos$ = this.http
        .get<any[]>(this.jsonFilePath)
        .pipe(shareReplay(1)); //carrega UMA vez só
    }
    return this.alimentos$;
  }

  getAlimentoByName(searchQuery: string): Observable<any[]> {
    return this.getAllAlimentos().pipe(
      map(data => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return data.filter(item =>
          item.description.toLowerCase().includes(query)
        );
      })
    );
  }
}
