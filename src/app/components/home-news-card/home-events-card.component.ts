import { Component, Input, OnInit } from '@angular/core';
import { EventCompleteResponse, EventOrganizerResponse } from 'src/app/connectors/api';
import { EventDescription } from 'src/app/connectors/api/model/eventDescription';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-events-card.component.html',
  styleUrls: ['./home-events-card.component.scss'],
  standalone: false
})
export class HomeEventsCardComponent implements OnInit{


  @Input("event") public event: EventCompleteResponse | null = null;
  eventDescription: EventDescription;
  
  constructor(
  ){

  }
  ngOnInit(): void {
    console.log(this.event);
    
    if(this.event){
      this.eventDescription = this.event.eventDescription;
    }
  }
}
