import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventsPageComponent } from './events-page/events-page.component';
import { SharedModule } from 'src/app/components/common/shared.module';

@NgModule({
    imports: [
        EventsRoutingModule,
        CommonModule,
        SharedModule
    ],
    exports: [],
    declarations: [EventsPageComponent],
    providers: [],
})
export class EventsModule { }
