import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReceitasService {
  
  constructor(private http: HttpClient) {}

  getReceitas(query: string): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', environment.apis.spoonacular.key)
      .set('query', query)
      .set('number', '10')
      .set('addRecipeInformation', 'true')
      .set('instructionsRequired', 'true');

    return this.http.get<any>(environment.apis.spoonacular.url, { params });
  }
}