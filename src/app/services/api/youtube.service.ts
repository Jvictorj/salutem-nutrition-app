import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {

  constructor(private http: HttpClient) {}

  getVideosFromChannel(channelId: string, maxResults = 10): Observable<any> {
    const params = new HttpParams()
      .set('key', environment.apis.youtube.key)
      .set('channelId', channelId)
      .set('order', 'date')
      .set('part', 'snippet')
      .set('type', 'video')
      .set('maxResults', maxResults.toString());

    return this.http.get(environment.apis.youtube.url, { params });
  }
}