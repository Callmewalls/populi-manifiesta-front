import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CalendarComponent } from './components/calendar-related/calendar/calendar.component';
import { DayDescriptionComponent } from './components/calendar-related/day-description/day-description.component';
import { HomeEventsCardComponent } from './components/home-news-card/home-events-card.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DayComponent } from './components/calendar-related/day/day.component';
import { RouterModule, RouterOutlet, provideRouter } from '@angular/router';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from 'src/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Aura from '@primeng/themes/aura';
import { DialogModule } from 'primeng/dialog';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DayDescriptionComponent,
        CalendarComponent,
        DayComponent,
        LayoutComponent,
        HomeEventsCardComponent,
        NavigatorComponent],
    exports: [
        AppComponent,
        HomeComponent,
        DayDescriptionComponent,
        CalendarComponent,
        DayComponent,
        LayoutComponent,
        HomeEventsCardComponent,
        NavigatorComponent],
    imports: [
        ScrollPanelModule,
        DividerModule,
        NgIf,
        NgFor,
        CommonModule,
        ButtonModule,
        CardModule, 
        RouterOutlet,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        DialogModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        providePrimeNG({
            theme: {
              preset: Aura
            }
          })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
