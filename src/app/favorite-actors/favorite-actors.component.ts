import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.favoriteActorsService.favoriteActors$.subscribe((actors) => {
      this.favoriteActors = actors;
    });
  }

  removeFavorite(actorId: number) {
    this.favoriteActorsService.removeFavorite(actorId);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Actor removed from favorites',
    });
  }
}
