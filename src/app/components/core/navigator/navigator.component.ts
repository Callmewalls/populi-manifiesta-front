import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
  standalone: false
}) 
export class NavigatorComponent implements OnInit{

  menuItems = [
    { name: 'Inicio', link: '/home' },
    { name: 'Noticias', link: '/noticias' },
    { name: 'Blogs', link: '/blogs' },
    { name: 'Eventos', link: '/events' }
  ];
  
  constructor(
    private router: Router
  ){
  }

  ngOnInit(){

  }


  logOut(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }
}
