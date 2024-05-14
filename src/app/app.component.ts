import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { ActorSearchComponent } from './actor-search/actor-search.component';
import { FavoriteActorsComponent } from './favorite-actors/favorite-actors.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    TabViewModule,
    ActorSearchComponent,
    FavoriteActorsComponent,
  ],
})
export class AppComponent {
  title = 'themovie';
}
