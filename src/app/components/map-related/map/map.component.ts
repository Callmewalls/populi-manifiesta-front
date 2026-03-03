import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { EventCompleteResponse } from 'src/app/connectors/api';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: false
})
export class MapComponent implements AfterViewInit, OnChanges {

  @ViewChild(GoogleMap) googleMap!: GoogleMap;
  @Input() events: EventCompleteResponse[] = [];
  @Output("onLocationClick") onLocationClick: EventEmitter<EventCompleteResponse> = new EventEmitter<EventCompleteResponse>();

  // Centro inicial (Madrid)
  center: google.maps.LatLngLiteral = {
    lat: 40.4168,
    lng: -3.7038
  };

  zoom = 2;

  // 🔹 MapOptions completos adaptados
  mapOptions: google.maps.MapOptions = {
    minZoom: 2,
    maxZoom: 18,
    gestureHandling: 'greedy',
    disableDefaultUI: false,
    clickableIcons: false,
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -179.999,
        east: 179.999
      },
      strictBounds: true
    }
  };

  private markers: google.maps.marker.AdvancedMarkerElement[] = [];
  private infoWindow!: google.maps.InfoWindow;

  async ngAfterViewInit() {
    await this.initialize();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['events'] && this.googleMap?.googleMap) {
      await this.loadMarkers();
    }
  }

  private async initialize() {
    const map = this.googleMap?.googleMap;
    if (!map) return;

    // Crear InfoWindow global (solo uno abierto a la vez)
    this.infoWindow = new google.maps.InfoWindow();

    await this.loadMarkers();
  }

  private async loadMarkers() {
    const map = this.googleMap?.googleMap;
    if (!map) return;

    // 🔥 Limpiar markers anteriores correctamente
    this.markers.forEach(marker => marker.map = null);
    this.markers = [];

    // 🔥 Importar librería oficial de markers
    const { AdvancedMarkerElement } =
      await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const bounds = new google.maps.LatLngBounds();

    this.events.forEach(event => {

      const position = {
        lat: event.location.latitude,
        lng: event.location.longitude
      };

      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
    <div class="marker-bubble">📍</div>
  `;

      const marker = new AdvancedMarkerElement({
        map,
        position,
        content: markerElement
      });

      // 🔥 Aquí vinculamos el objeto event
      marker.addListener('gmp-click', () => {

        // Emitimos el objeto completo
        this.onLocationClick.emit(event);

        // Mostrar tooltip
        this.infoWindow.setHeaderContent(
          `${event.eventDescription?.eventName}`
        );

        this.infoWindow.setContent(`
          <div style="width:30%;">
          <img style="width:100%;" src="${event?.eventDescription?.imageUrl}">
          </div>
          `)

        this.infoWindow.open({
          anchor: marker,
          map
        });
      });

      this.markers.push(marker);
    });
  }

  public async refreshMap(): Promise<void> {

    const map = this.googleMap?.googleMap;
    if (!map) return;

    // 🔥 Forzar recalculo de tamaño
    google.maps.event.trigger(map, 'resize');

    // 🔥 Limpiar markers actuales
    this.markers.forEach(marker => marker.map = null);
    this.markers = [];

    // 🔥 Volver a cargar markers
    await this.loadMarkers();
  }
}