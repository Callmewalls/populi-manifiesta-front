import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { EventListComponent } from 'src/app/components/event-related/event-list/event-list.component';
import { EventManagerComponent } from 'src/app/components/event-related/event-manager/event-manager.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';


@NgModule({
    imports: [
        CommonModule,
        TableModule,
        TagModule,
        InputTextModule,
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
        InputTextModule,
        TableModule,
        RatingModule,
        TagModule
    ],
    declarations: [
        EventListComponent,
        EventManagerComponent,
        FileUploaderComponent
    ],
    exports: [
        EventListComponent,
        EventManagerComponent,
        FileUploaderComponent
    ],
    providers: [],
})
export class SharedModule { }
