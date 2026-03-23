import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { NavigatorComponent } from './navigator/navigator.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HomeModule } from '../home-related/home.module';

@NgModule({
  declarations: [
    LayoutComponent,
    NavigatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    CardModule,
  ],
  exports: [
    LayoutComponent,
    NavigatorComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya está cargado. Solo importar en AppModule.');
    }
  }
}