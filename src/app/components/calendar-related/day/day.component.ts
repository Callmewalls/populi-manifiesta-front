import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventControllerService, EventResponse } from 'src/app/connectors/api';
@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  standalone: false
})
export class DayComponent implements OnInit {

  @Output("dayClicked") dayClicked = new EventEmitter<string>();
  @Input('day') day: number = 0;
  @Input('month') month: number = 0;
  @Input('year') year: number = 0;
  @Input('events') events: EventResponse[] = [];
  protected dateTime: Date = new Date();
  protected selectedEvent: any;
  constructor
    (
      private eventService: EventControllerService
    ) {
    this.dateTime = new Date(this.year, this.month, this.day);

  }

  ngOnInit(): void {

  }

  onDayClick() {
    this.dayClicked.emit(`${this.year}-${this.month < 10 ? '0' + (this.month) : (this.month)}-${this.day < 10 ? '0' + this.day : this.day}`);
  }
}
