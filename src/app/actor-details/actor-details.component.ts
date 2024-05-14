import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.scss',
})
export class ActorDetailsComponent {
  actor: any;

  constructor(
    public config: DynamicDialogConfig,
    private tmdbService: TmdbService
  ) {
    this.actor = this.config.data.actor;
  }
}
