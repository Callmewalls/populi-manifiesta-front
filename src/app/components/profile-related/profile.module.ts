import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProfileRoutingModule } from './profile-routing.module';
import { TabsModule } from 'primeng/tabs';
import { ProfileManagerComponent } from './profile-manager/profile-manager.component';
import { AvatarModule } from 'primeng/avatar';
import { EditorModule } from 'primeng/editor';
import { SharedModule } from '../common/shared.module';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileManagerComponent
    ],
    imports: [
        CommonModule, 
        ProfileRoutingModule,
        ButtonModule, 
        CardModule, 
        ReactiveFormsModule, 
        FormsModule,
        TabsModule,
        AvatarModule,
        EditorModule,
        SharedModule
    ]
})
export class ProfileModule { }