import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciciosService {
  private apiUrl = 'https://wger.de/api/v2/exercise/?language=2'; // Português
  private imageUrl = 'https://wger.de/api/v2/exerciseimage/?is_main=True'; // Imagens principais

  constructor(private http: HttpClient) {}

  // Método que faz a requisição de exercícios
  getExercicios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método que faz a requisição das imagens principais
  getMainImages(): Observable<any> {
    return this.http.get<any>(this.imageUrl);
  }
}
