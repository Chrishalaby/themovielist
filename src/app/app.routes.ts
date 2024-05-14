import { Routes } from '@angular/router';
import { ActorSearchComponent } from './actor-search/actor-search.component';
import { FavoriteActorsComponent } from './favorite-actors/favorite-actors.component';

export const routes: Routes = [
  { path: 'search', component: ActorSearchComponent },
  { path: 'favorites', component: FavoriteActorsComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
];
