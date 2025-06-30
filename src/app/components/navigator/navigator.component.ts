import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
  standalone: false
}) 
export class NavigatorComponent implements OnInit{

  menuItems = [
    { name: 'Inicio', link: '/inicio' },
    { name: 'Noticias', link: '/noticias' },
    { name: 'Blogs', link: '/blogs' },
    { name: 'Eventos', link: '/eventos' },
    { name: 'Cuenta', link: '/login', icon: '<i class="pi pi-times"></i>' }
  ];
  
  constructor(){
    console.log('NavigatorComponent initialized');  
  }

  ngOnInit(){

  }
}
