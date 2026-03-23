import { Component } from '@angular/core';
import { EventCompleteResponse } from 'src/app/connectors/api';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss',
  standalone: false
})
export class EventsPageComponent {

  protected events: EventCompleteResponse[] = []

}
