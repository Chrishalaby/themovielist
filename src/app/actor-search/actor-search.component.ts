import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ActorDetailsComponent } from '../actor-details/actor-details.component';
import { FavoriteActorsService } from '../favorite-actors.service';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-actor-search',
  standalone: true,
  templateUrl: './actor-search.component.html',
  styleUrl: './actor-search.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    CarouselModule,
  ],
  providers: [DialogService, MessageService],
})
export class ActorSearchComponent implements OnInit {
  query: string = '';
  actors: any[] = [];
  selectedActor: any = null;
  responsiveOptions: any[] | undefined;

  constructor(
    private tmdbService: TmdbService,
    private favoriteActorsService: FavoriteActorsService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  searchActors() {
    if (this.query.trim()) {
      this.tmdbService.searchActors(this.query).subscribe((data: any) => {
        this.actors = data.results;
      });
    }
  }

  selectActor(actor: any) {
    this.selectedActor = actor;
    this.showActorDetailsDialog();
  }

  showActorDetailsDialog() {
    const ref = this.dialogService.open(ActorDetailsComponent, {
      data: {
        actor: this.selectedActor,
      },
      header: this.selectedActor.name,
      width: '50%',
    });

    ref.onClose.subscribe(() => {
      this.selectedActor = null;
    });
  }

  addFavorite(actor: any) {
    this.favoriteActorsService.addFavorite(actor);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Actor added to favorites',
    });
    this.cdr.detectChanges();
  }
}
