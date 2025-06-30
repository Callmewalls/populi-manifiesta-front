import { Component, OnInit } from '@angular/core';
import { HomeEventsCardComponent } from '../home-news-card/home-events-card.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CalendarComponent } from '../calendar-related/calendar/calendar.component';
import { DividerModule } from 'primeng/divider';
import { DayDescriptionComponent } from '../calendar-related/day-description/day-description.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ProgrammedEventControllerService } from '../../connectors/api/api/programmedEventController.service';
import { ProgrammedEventDto, ProgrammedEventOrganizerDto } from 'src/app/connectors/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {

  showOverlay: boolean = false;
  showDescription: boolean = false;
  showNews: boolean = false;
  selectedEvent: ProgrammedEventOrganizerDto;
  homeEvents: ProgrammedEventOrganizerDto[] = [];

  constructor(
    private programmedEventService: ProgrammedEventControllerService
  ) { }

  ngOnInit() {

  }



  toggleDay(date: string) {
    this.showOverlay = true;
    this.showNews = true;
    console.log(date);

    this.programmedEventService.getProgrammedEventForDate(date).subscribe(
      events => {
        this.homeEvents = events;
        console.log(events);

      }
    )
  }

  toggleDescription(showDescription: boolean, showNews: boolean, event?: ProgrammedEventOrganizerDto) {

    this.showDescription = showDescription;
    this.showNews = showNews;

    if (event) {
      this.selectedEvent = event;
    }
    else{
      this.selectedEvent = null;
    }
  }
}
