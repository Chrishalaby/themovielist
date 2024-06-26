import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteActorsService {
  private storageKey = 'favoriteActors';
  private favoriteActorsSubject = new BehaviorSubject<any[]>(
    this.getFavorites()
  );
  favoriteActors$ = this.favoriteActorsSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  getFavorites(): any[] {
    const favorites = this.localStorageService.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(actor: any) {
    const favorites = this.getFavorites();
    if (!favorites.find((fav) => fav.id === actor.id)) {
      favorites.push(actor);
      this.localStorageService.setItem(
        this.storageKey,
        JSON.stringify(favorites)
      );
      this.favoriteActorsSubject.next(favorites);
    }
  }

  removeFavorite(actorId: number) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((fav) => fav.id !== actorId);
    this.localStorageService.setItem(
      this.storageKey,
      JSON.stringify(favorites)
    );
    this.favoriteActorsSubject.next(favorites);
  }
}
