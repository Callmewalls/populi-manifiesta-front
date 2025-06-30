import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgrammedEventControllerService } from 'src/app/connectors/api';
@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  standalone: false
})
export class DayComponent implements OnInit{

  @Output("dayClicked") dayClicked = new EventEmitter<string>();
  @Input('day') day: number = 0;
  @Input('month') month: number = 0;
  @Input('year') year: number = 0;
  protected dateTime: Date = new Date();
  protected events: any[] = [{label: 'Evento 1',dateTime: this.dateTime}, {label: 'Evento 2',dateTime: this.dateTime}, {label: 'Evento 3',dateTime: this.dateTime}, {label: 'Evento 4',dateTime: this.dateTime}, {label: 'Evento 5',dateTime: this.dateTime}, {label: 'Evento 6',dateTime: this.dateTime}, {label: 'Evento 7',dateTime: this.dateTime}, {label: 'Evento 8',dateTime: this.dateTime}];
  protected selectedEvent: any;
  constructor
  (
    private programmedEventControllerService :ProgrammedEventControllerService
  ) {
  }

  ngOnInit(): void {
    
  }

  onDayClick(){
    this.dayClicked.emit(`${this.year}-${this.month < 10 ? '0' + (this.month + 1) : (this.month + 1)}-${this.day < 10 ? '0' + this.day : this.day}`);
  }
}
