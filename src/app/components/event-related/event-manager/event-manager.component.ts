import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventDescriptionResponse } from '../../../connectors/api/model/eventDescriptionResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'primeng/editor';
import { FileUpload } from 'primeng/fileupload';
import { GoogleMap } from '@angular/google-maps';
import { DocumentsService } from 'src/app/connectors/document';
import { ResponsiveService } from 'src/app/common/services/responsive.service';
import { Observable } from 'rxjs';
import { EventControllerService, EventRequest } from 'src/app/connectors/api';

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrl: './event-manager.component.scss',
  standalone: false
})
export class EventManagerComponent {

  isMobile$!: Observable<boolean>;

  isDragOver = false;

  // * Maps
  @ViewChild('autocompleteContainer', { static: false })
  autocompleteContainer!: ElementRef;
  @ViewChild('googleMap', { static: false })
  googleMap!: GoogleMap;
  zoom = 6;
  center: google.maps.LatLngLiteral = { lat: 40.4168, lng: -3.7038 };
  marker!: google.maps.marker.AdvancedMarkerElement;

  // * File Uploader
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  selectedFile!: File;

  protected description: EventDescriptionResponse;

  protected form: FormGroup;
  protected imgSrc;

  protected showEditor: boolean = false;
  protected editorContent: string;
  protected textDestiny: string;
  @Output("closeDescriptionEmitter") protected closeDescriptionEmitter = new EventEmitter<boolean>();


  constructor(
    protected fb: FormBuilder,
    private documentService: DocumentsService,
    protected responsiveService: ResponsiveService,
    private eventService: EventControllerService
  ) {
    this.form = this.fb.group({
      eventName: ["Name", [Validators.required]],
      objectivesText: ["Objectives", [Validators.required]],
      initDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]],
      eventDescription: ["Description", [Validators.required]],
      lat: [null, [Validators.required]],
      lon: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]]
    });

    this.isMobile$ = this.responsiveService.isMobile$;
  }

  async ngAfterViewInit() {
    await this.initAutocomplete();
  }

  // Inicializamos el autocomplete de Places API
  async initAutocomplete() {
    const placesLib = await google.maps.importLibrary('places') as any;

    // Creamos el autocomplete y lo montamos en el DOM
    const autocomplete = new placesLib.PlaceAutocompleteElement();
    this.autocompleteContainer.nativeElement.appendChild(autocomplete);

    // Listener de selección
    autocomplete.addEventListener('gmp-select', async (event: any) => {
      const prediction = event.placePrediction;
      if (!prediction?.placeId) return;

      const { Place } = await google.maps.importLibrary("places") as any;

      const place = new Place({
        id: prediction.placeId
      });

      await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location"]
      });

      if (!place.location) return;

      const lat = place.location.lat();
      const lng = place.location.lng();
      const address = place.formattedAddress ?? place.displayName ?? '';

      this.center = { lat, lng };
      this.zoom = 15;
      this.updateMarker({ lat, lng });

      // --- Reverse geocoding ---
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const addressComponents = results[0].address_components;

          const city = this.getAddressComponent(addressComponents, "locality");
          const state = this.getAddressComponent(addressComponents, "administrative_area_level_1");
          const country = this.getAddressComponent(addressComponents, "country", true);

          this.form.patchValue({ city, state, country });
        } else {
          console.error("Geocoder failed: " + status);
        }
      });

      this.form.patchValue({
        lat: lat,
        lon: lng,
      });

      console.log('Lugar seleccionado:', address, lat, lng);
    });

  }


  onMapClick(event: google.maps.MapMouseEvent) {
    if (!event.latLng) return;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    this.updateMarker({ lat, lng });
    this.form.patchValue({ lat: lat, lon: lng });

    // --- Reverse geocoding ---
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;

        const city = this.getAddressComponent(addressComponents, "locality");
        const state = this.getAddressComponent(addressComponents, "administrative_area_level_1");
        const country = this.getAddressComponent(addressComponents, "country", true);

        console.log({ city, state, country });

        this.form.patchValue({ city, state, country });
      } else {
        console.error("Geocoder failed: " + status);
      }
    });
  }

  private getAddressComponent(
    components: google.maps.GeocoderAddressComponent[],
    type: string,
    useShortName = false
  ) {
    console.log(components);
    console.log(type);
    console.log(useShortName);
    
    const comp = components.find(c => c.types.includes(type));
    console.log(comp);
    
    if (!comp) return null;
    return useShortName ? comp.short_name : comp.long_name;
  }

  // Crear o mover marcador AdvancedMarkerElement
  async updateMarker(position: google.maps.LatLngLiteral) {
    const markerLib = await google.maps.importLibrary('marker') as any;

    // Si ya existe, lo movemos
    if (this.marker) {
      this.marker.position = position;
      this.marker.map = this.googleMap.googleMap!;
      return;
    }

    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker'; // tu clase CSS
    markerElement.innerText = '📍'; // opcional, icono o texto

    this.marker = new google.maps.marker.AdvancedMarkerElement({
      position: position,
      map: this.googleMap.googleMap!,
      title: 'Ubicación del evento',
      content: markerElement // ✅ HTMLElement
    });
  }


  setEditorText() {

    console.log(this.editorContent);
    

    if (this.textDestiny == 'objectives') {
      this.form.controls.objectivesText.setValue(this.editorContent);
    }
    else {
      this.form.controls.eventDescription.setValue(this.editorContent);
    }

    this.editorContent = '';

    this.showEditor = false;
  }


  // DRAG & DROP
  onDragOver(event: DragEvent) {
    event.preventDefault(); // muy importante
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onUpload(event: any) {
    const file: File = event.files[0];
    this.handleFile(file);
  }

  handleFile(file: File) {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imgSrc = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  logChange(event) {
    this.imgSrc = URL.createObjectURL(event.srcElement.files[0]);
  }

  toggleEditor(textDestiny: string) {
    this.textDestiny = textDestiny;
    this.editorContent = this.form.controls[textDestiny]?.value;
    this.showEditor = true;
  }

  initCreateEvent() {
    if (!this.form.valid || !this.selectedFile) return;

    const eventRequest: EventRequest = { ...this.form.value };
    console.log(eventRequest);

    // this.selectedFile ya es un File, que es un Blob
    this.eventService.createEvent(eventRequest, this.selectedFile).subscribe({
      next: res => {
        this.form.reset();
        this.closeDescriptionEmitter.emit();
      },
      error: err => console.error('Error al crear evento:', err)
    });
  }
}