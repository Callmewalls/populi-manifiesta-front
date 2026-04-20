import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventsPageComponent } from './events-page/events-page.component';
import { SharedModule } from 'src/app/components/common/shared.module';
import { ScrollPanelModule } from "primeng/scrollpanel";
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    imports: [
    EventsRoutingModule,
    CommonModule,
    SharedModule,
    ScrollPanelModule,
    PaginatorModule
],
    exports: [],
    declarations: [EventsPageComponent],
    providers: [],
})
export class EventsModule { }
