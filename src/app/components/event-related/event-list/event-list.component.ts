import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EventCompleteResponse } from 'src/app/connectors/api';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
  standalone: false
})
export class EventListComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events) {
      this.events = this.events.map(e => ({
        ...e,
        categoriesText: e.categories?.map(c => c.name).join(', ')
      }));
    }
  }

  @Input("events") events: EventCompleteResponse[] = [];
  cols: string[] = ['Name', 'Init Date', 'Location', 'Signatures']

  ngOnInit(): void {
  }

  onNameSearch(table: any, value: string) {
    table.filter(value.trim(), 'eventDescription.eventName', 'contains');
  }

  onLocationSearch(table: any, value: string) {
    table.filter(value.trim(), 'location.addressLabel', 'contains');
  }

  onCategorySearch(table: any, value: string) {
    console.log(this.events);

    table.filter(value.trim(), 'categoriesText', 'contains');
  }

}
