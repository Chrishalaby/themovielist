import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiKey: string = '5a3764aae6b554e5cba37357b2c16b8b';
  private apiUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  searchActors(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/person?query=${query}&include_adult=false&language=en-US&page=1&api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getActorMovies(actorId: number): Observable<any> {
    const url = `${this.apiUrl}/person/${actorId}/movie_credits?language=en-US&api_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
