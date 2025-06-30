import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { EventDescriptionControllerService, EventDescriptionDto, ProgrammedEventDto, ProgrammedEventOrganizerDto } from 'src/app/connectors/api';

@Component({
  selector: 'app-day-description',
  templateUrl: './day-description.component.html',
  styleUrls: ['./day-description.component.css'],
  standalone: false
})
export class DayDescriptionComponent  implements OnInit{

  @Input("event") event: ProgrammedEventOrganizerDto;
  
  protected description: EventDescriptionDto;

  objectives1: string[] = ['Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.'
    ,'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.'];
    
  objectives2: string[] = ['1','2','3','4','5'];

  protected eventName: string ="Por una mejor educación";
  protected organizer: string ="Batman";
  protected initDate: string = new Date().toISOString();
  protected endDate: string = new Date().toISOString();
  protected signsNumber: number = 1358;
  protected text: string = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dolores doloremque sit natus voluptatibus hic laudantium ab dicta officiis, mollitia eius aliquam magni ut repellat perferendis earum quidem quos quaerat.';

  @Output("closeDescriptionEmitter") protected closeDescriptionEmitter = new EventEmitter<boolean>();

  constructor(
    private eventDescriptionService: EventDescriptionControllerService
  ){
  }

  ngOnInit(): void {
    console.log(this.event);
    
    this.eventDescriptionService.findByEventId(this.event.id).subscribe(
      description =>{
        console.log(description);
        
        if(description){
          this.description = description;
          this.initDate = new Date(this.event.dateTime).toISOString();
          this.endDate = new Date(new Date(this.event.dateTime).setHours(new Date(this.event.dateTime).getHours() + 5)).toISOString();
        }
      }
    );
  }

  closeDescription(){
    this.closeDescriptionEmitter.emit(false)
  }
}
