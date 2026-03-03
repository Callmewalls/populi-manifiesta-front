import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HomeEventsCardComponent } from './components/home-news-card/home-events-card.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { providePrimeNG } from 'primeng/config';
import { routes } from 'src/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Aura from '@primeng/themes/aura';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { CalendarModule } from './components/calendar-related/calendar.module';
import { MapComponent } from './components/map-related/map/map.component';
import { EventsModule } from './components/event-related/event.module';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { EventListComponent } from "./components/event-related/event-list/event-list.component";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LayoutComponent,
        HomeEventsCardComponent,
        NavigatorComponent,
        MapComponent
    ],
    exports: [
    ],
    imports: [
        TabsModule,
        CalendarModule,
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
        DialogModule,
        EventsModule,
        GoogleMapsModule,
        MapMarker
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
