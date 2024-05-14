import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FavoriteActorsService } from '../favorite-actors.service';

@Component({
  selector: 'app-favorite-actors',
  standalone: true,
  imports: [CommonModule, ButtonModule, ToastModule],
  templateUrl: './favorite-actors.component.html',
  styleUrl: './favorite-actors.component.scss',
  providers: [MessageService],
})
export class FavoriteActorsComponent implements OnInit {
  favoriteActors: any[] = [];

  constructor(
    private favoriteActorsService: FavoriteActorsService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadFavorites();
    this.cdr.detectChanges();
  }

  loadFavorites() {
    this.favoriteActors = this.favoriteActorsService.getFavorites();
  }

  removeFavorite(actorId: number) {
    this.favoriteActorsService.removeFavorite(actorId);
    this.loadFavorites();
    this.cdr.detectChanges();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Actor removed from favorites',
    });
  }
}
