import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavigatorComponent } from "../navigator/navigator.component";
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: false
})
export class LayoutComponent {


  protected showNav: boolean = false;

  constructor(
    protected authService: AuthService
  ) {
  }

  toggleNav() {
    this.showNav = !this.showNav;
  }
}
