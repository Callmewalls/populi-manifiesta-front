import { NgModule } from '@angular/core';
import { EventManagerComponent } from './event-manager/event-manager.component';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
    imports: [
        CardModule,
        ScrollPanelModule,
        DatePickerModule,
        FormsModule,
        EditorModule,
        ReactiveFormsModule,
        DialogModule,
        ButtonModule,
        FileUploadModule,
        GoogleMapsModule,
        CommonModule,
        InputTextModule,
        TableModule,
        RatingModule
    ],
    exports: [EventManagerComponent, EventListComponent],
    declarations: [EventManagerComponent, EventListComponent],
    providers: [],
})
export class EventsModule { }
