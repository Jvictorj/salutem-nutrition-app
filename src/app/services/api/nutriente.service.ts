import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NutrienteService {
  private jsonFilePath = 'assets/dados/tabela_alimentos.json';

  constructor(private http: HttpClient) {}

  getAllAlimentos(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonFilePath);
  }

  getAlimentoByName(searchQuery: string): Observable<any[]> {
    return this.getAllAlimentos().pipe(
      map((data) => {
        if (!searchQuery.trim()) return [];
        return data.filter((item: any) =>
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    );
  }
}