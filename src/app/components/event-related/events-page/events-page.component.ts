import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EventCompleteResponse, EventControllerService } from 'src/app/connectors/api';
import { PageEventCompleteResponse } from 'src/app/connectors/api/model/pageEventCompleteResponse';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss',
  standalone: false
})
export class EventsPageComponent implements OnInit {

  protected events: EventCompleteResponse[] = [];

  protected totalElements = 0;
  protected rows = 10;        // size
  protected first = 0;        // offset

  constructor(private eventService: EventControllerService) { }

  async ngOnInit(): Promise<void> {
    await this.loadPage(0, this.rows);
  }

  async loadPage(page: number, size: number): Promise<void> {
    const response: PageEventCompleteResponse = await firstValueFrom(
      this.eventService.findAll({
        page: page,
        size: size
      })
    );

    this.events = response.content ?? [];
    this.totalElements = response.totalElements ?? 0;
  }

  async onPageChange(event: any): Promise<void> {
    const page = event.page;   // PrimeNG ya te da el índice de página
    const size = event.rows;

    this.first = event.first;
    this.rows = size;

    await this.loadPage(page, size);
  }
}