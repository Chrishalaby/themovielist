import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ActorDetailsComponent } from '../actor-details/actor-details.component';
import { FavoriteActorsService } from '../favorite-actors.service';
import { TmdbService } from '../tmdb.service';
@Component({
  selector: 'app-actor-search',
  standalone: true,
  templateUrl: './actor-search.component.html',
  styleUrls: ['./actor-search.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    CarouselModule,
    DataViewModule,
    PaginatorModule,
    TabViewModule,
  ],
  providers: [DialogService, MessageService],
})
export class ActorSearchComponent {
  query: string = '';
  actors: any[] = [];
  paginatedActors: any[] = [];
  selectedActor: any = null;
  responsiveOptions: any[] | undefined;
  totalRecords: number = 0;
  rows: number = 9;

  constructor(
    private tmdbService: TmdbService,
    private favoriteActorsService: FavoriteActorsService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  searchActors() {
    if (this.query.trim()) {
      this.tmdbService.searchActors(this.query).subscribe((data: any) => {
        this.actors = data.results;
        this.totalRecords = this.actors.length;
        this.paginate({ first: 0, rows: this.rows });
      });
    }
  }

  paginate(event: any) {
    const { first, rows } = event;
    this.paginatedActors = this.actors.slice(first, first + rows);
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
