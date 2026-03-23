import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit{ 
  title = 'project-web';
  token: string;  
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    
  this.router.events.subscribe(event => {
      
      if (event instanceof NavigationStart && event.url != '/auth/login'  && event.url != '/auth/register') {
        this.token = localStorage.getItem('token');
        
        if (this.token == null || this.token == undefined) {
          // Puedes redirigir al login
          this.router.navigate(['/auth/login']);
        } else {
        }
      }
    });
  }

} 
