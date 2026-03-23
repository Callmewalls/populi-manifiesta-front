import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MapComponent } from '../../map-related/map/map.component';
import { EventOrganizerResponse, EventControllerService, EventResponse, EventCompleteResponse } from '../../../connectors/api';
import { MonthsNames } from 'src/app/types/MonthsNames';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {

  @ViewChild('mapComponent', { static: false })
  mapComponent!: any;

  protected token: string;

  protected events: EventResponse[] = [];
  
  protected showNav: boolean = false;
  protected showOverlay: boolean = false;
  protected showDescription: boolean = false;
  protected showNews: boolean = false;
  protected showEventManager: boolean = false;
  protected selectedEvent: EventOrganizerResponse | null = null;
  protected homeEvents: EventOrganizerResponse[] | null = [];
  protected showCreateDialog: boolean = false;
  protected monthsNames: Record<number, string> = MonthsNames;

  protected month: number;

  constructor(
    private eventService: EventControllerService
  ) {
    this.token = localStorage.getItem('token');
    this.month = new Date().getMonth();
  }

  ngOnInit() {
    this.getEventsOfMonth();
  }

  toggleDay(date: string) {
    this.showOverlay = true;
    this.showNews = true;
    console.log(date);
    console.log(this.events);
    
    this.homeEvents = this.events.filter(e => new Date(e.initDate).getDate() == new Date(date).getDate())
    
  }
  
  getEventsOfMonth() {
    this.eventService.getEventsByMonth(this.month + 1).subscribe(
      events => {
        this.events = events;
        console.log(events);
        
      }
    )
  }

  toggleDescription(showDescription: boolean, showNews: boolean, event?: EventOrganizerResponse) {

    this.showDescription = showDescription;
    this.showNews = showNews;

    if (event) {
      this.selectedEvent = event;
    }
    else {
      this.selectedEvent = null;
    }
  }

  onTabChange(index: string | number) {

    if (index === '1') { // 👈 índice del tab del mapa
      setTimeout(() => {
        if (this.mapComponent) {
          this.mapComponent.refreshMap();
        } else {
          console.log('mapComponent es undefined');
        }
      }, 200);
    }
  }

  showCreateEvent(show: boolean) {
    if (show) {
      this.showOverlay = true;
      this.showEventManager = true;
      this.showDescription = false;
      this.showNews = false;
    }
    else{
      this.showOverlay = false;
      this.showEventManager = false;
      this.showDescription = false;
      this.showNews = false;
    }

    this.ngOnInit();
  }


  monthChange(fordward: boolean) {
    fordward ? this.month++ : this.month--;
    this.getEventsOfMonth();
  }

  onLocationClick(event: EventCompleteResponse){
    console.log(event);
    
  }

}
