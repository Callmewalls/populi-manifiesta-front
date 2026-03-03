import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from "primeng/table";
import { EventCompleteResponse } from 'src/app/connectors/api';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
  standalone: false
})
export class EventListComponent implements OnInit {

  @Input("events") events: EventCompleteResponse[] = [];
  cols: string[] = ['Name', 'Init Date', 'Location', 'Signatures']

  ngOnInit(): void {
    console.log(this.events);
    
  }

}
