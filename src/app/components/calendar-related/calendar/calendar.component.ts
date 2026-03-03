import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgIf } from '@angular/common';
import { Months } from 'src/app/types/Months';
import { MonthsNames } from 'src/app/types/MonthsNames';
import { EventControllerService, EventResponse } from 'src/app/connectors/api';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: false
})
export class CalendarComponent implements OnInit, OnChanges {

  protected hoy = new Date();
  protected day: number;
  @Input("month") month: number;
  protected year: number;

  protected days: any[] = [];
  dayClickedBoolean = false;
  @Output("dayClicked") dayClicked = new EventEmitter<string>();

  @Input("events") protected events: EventResponse[] = [];

  calendar: (any | null)[][] = [];
  eventsByDay = new Map<number, EventResponse[]>();

  constructor(
  ) {
    this.day = this.hoy.getDate();
    this.month = this.hoy.getMonth();
    this.year = this.hoy.getFullYear();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes && changes.events) {

      this.buildDays();
      this.buildCalendar();
      this.buildEventsMap();
    }
  }

  buildDays() {
    
    
    const firstWeekDayOfMonth =
      (new Date(this.year, this.month, 1).getDay() + 6) % 7;

    this.days = Array.from(
      { length: Months[this.month + 1] },
      (_, i) => {
        const cellIndex = i + firstWeekDayOfMonth;

        return {
          day: i + 1,
          week: Math.floor(cellIndex / 7),
          weekDay: cellIndex % 7,
          month: this.month
        };
      }
    );
  }

  buildCalendar() {
    
    this.calendar = Array.from({ length: 6 }, () =>
      Array.from({ length: 7 }, () => null)
    );

    for (const day of this.days) {
      this.calendar[day.week][day.weekDay] = day;
    }
  }

  buildEventsMap() {
    this.eventsByDay.clear();

    for (const event of this.events) {
      const date = new Date(event.initDate);
      const key = date.getDate();

      if (!this.eventsByDay.has(key)) {
        this.eventsByDay.set(key, []);
      }

      this.eventsByDay.get(key)!.push(event);
    }
    console.log(this.events);
    console.log(this.eventsByDay);
    
    
  }


  emitDayClicked(event) {
    this.dayClicked.emit(event);
  }

  getEventsForDay(day: number): EventResponse[] {

    return this.events.filter(e => new Date(e.initDate).getDate() == day);
  }

}
