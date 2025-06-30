import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgIf } from '@angular/common';
import { Months } from 'src/app/auth/types/Months';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  standalone: false
})
export class CalendarComponent implements OnInit{

  protected hoy = new Date();
  protected day: number;
  protected month: number;
  protected year: number;
  
  protected days: number[] = [];
  dayClickedBoolean = false;
  @Output("dayClicked") dayClicked = new EventEmitter<string>();

  constructor()
  {
  }

  ngOnInit(): void {
    this.day = this.hoy.getDay();
    this.month = this.hoy.getMonth();
    this.year = this.hoy.getFullYear();
    console.log(this.day);
    console.log(this.month);
    console.log(this.year);
    this.days = Array.from({ length: Months[this.month - 1] }, (_, i) => i + 1);
  }

  emitDayClicked(event){
    this.dayClicked.emit(event);
  }

  initCreateEvent(){

  }
}
