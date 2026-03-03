import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { routes } from 'src/app-routing.module';
import { EventsModule } from "../event-related/event.module";
import { NgModule } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { EventDescriptionComponent } from './event-description/event-description.component';


@NgModule({
    imports: [
        ScrollPanelModule,
        DividerModule,
        NgIf,
        NgFor,
        CommonModule,
        ButtonModule,
        CardModule,
        RouterOutlet,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        DialogModule,
        EventsModule,
        TagModule
    ],
    exports: [
        CalendarComponent,
        DayComponent,
        EventDescriptionComponent
    ],
    declarations: [
        CalendarComponent,
        DayComponent,
        EventDescriptionComponent
    ],
    providers: [],
})
export class CalendarModule { }
