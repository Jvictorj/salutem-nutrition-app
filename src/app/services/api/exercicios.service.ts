import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciciosService {
  private apiUrl = `${environment.apis.wger.url}/exercise/?language=2`; 
  private imageUrl = `${environment.apis.wger.url}/exerciseimage/?is_main=True`;

  constructor(private http: HttpClient) {}

  getExercicios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getMainImages(): Observable<any> {
    return this.http.get<any>(this.imageUrl);
  }
}