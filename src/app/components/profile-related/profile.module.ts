import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    declarations: [ProfileComponent],
    imports: [CommonModule, ProfileRoutingModule, ButtonModule, CardModule, ReactiveFormsModule, FormsModule]
})
export class ProfileModule { }