import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  apiKey = 'AIzaSyBliXo4oHORiW4nz7AS1Du6OIzeoAd-5cU';

  constructor(private http: HttpClient) {}

  // Função para obter vídeos de um canal específico
  getVideosFromChannel(channelId: string, maxResults = 10): Observable<any> {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&channelId=${channelId}&order=date&part=snippet&type=video,id&maxResults=${maxResults}`;
    return this.http.get(url);
  }
}