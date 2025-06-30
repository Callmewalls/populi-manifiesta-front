import { Component, Input, OnInit } from '@angular/core';
import { DayDescriptionControllerService, DayDescriptionDto, ProgrammedEventDto, ProgrammedEventOrganizerDto } from 'src/app/connectors/api';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-events-card.component.html',
  styleUrls: ['./home-events-card.component.css'],
  standalone: false
})
export class HomeEventsCardComponent implements OnInit{


  @Input("event") public event: ProgrammedEventOrganizerDto;
  dayDescription: DayDescriptionDto;
  constructor(
    private dayDescriptionService: DayDescriptionControllerService
  ){

  }
  ngOnInit(): void {
    console.log(this.event);
    
    if(this.event){
      this.dayDescriptionService.getDayDescriptionForEvent(this.event.id).subscribe(
        descriptions => {
          console.log(descriptions);
          
          this.dayDescription = descriptions;
        }
      )
    }
  }
}
