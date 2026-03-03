import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { EventDescriptionControllerService, EventOrganizerResponse, EventResponse, EventDescriptionUrlResponse, EventCompleteResponse } from 'src/app/connectors/api';

@Component({
  selector: 'app-day-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss'],
  standalone: false
})
export class EventDescriptionComponent implements OnInit {

  @Input("event") event: EventCompleteResponse;

  protected description: EventDescriptionUrlResponse;
  backgroundImage!: SafeStyle;

  objectives2: string[] = ['1', '2', '3', '4', '5'];

  protected eventName: string = "Por una mejor educación";
  protected organizer: string = "Batman";
  protected initDate: string = new Date().toISOString();
  protected endDate: string = new Date().toISOString();
  protected signsNumber: number = 1358;
  protected text: string = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.';

  @Output("closeDescriptionEmitter") protected closeDescriptionEmitter = new EventEmitter<boolean>();

  constructor(
    private eventDescriptionService: EventDescriptionControllerService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    console.log("Event: ", this.event);

    this.description = this.event?.eventDescription;
    this.backgroundImage = this.sanitizer.bypassSecurityTrustStyle(
      `url('${this.description.imageUrl}')`
    );
    this.initDate = new Date(this.event.initDate).toISOString();
    this.endDate = new Date(new Date(this.event.initDate).setHours(new Date(this.event.initDate).getHours() + 5)).toISOString();
  }

  closeDescription() {
    this.closeDescriptionEmitter.emit(false)
  }
}
