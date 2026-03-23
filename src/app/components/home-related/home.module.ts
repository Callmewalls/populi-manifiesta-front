import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HomeEventsCardComponent } from './home-news-card/home-events-card.component';
import { MapComponent } from '../map-related/map/map.component';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabsModule } from 'primeng/tabs';
import { CalendarModule } from '../calendar-related/calendar.module';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/common/services/shared.module';
import { TableModule } from 'primeng/table';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
    declarations: [
        HomeComponent,
        HomeEventsCardComponent,
        MapComponent
    ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        TabsModule,
        ScrollPanelModule,
        DividerModule,
        CalendarModule,
        ButtonModule,
        SharedModule,
        GoogleMapsModule,
        TableModule,
    ],
    providers: [],
})
export class HomeModule { }
