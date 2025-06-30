import { Component } from '@angular/core';
import { NavigatorComponent } from "../navigator/navigator.component";
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  standalone: false
})
export class LayoutComponent {


  constructor(
    protected authService: AuthService
  ){

  }
}
