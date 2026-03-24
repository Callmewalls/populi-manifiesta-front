import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
  standalone: false
})
export class FileUploaderComponent {

  isMobile$!: Observable<boolean>;

  isDragOver: boolean = false;

  // * File Uploader
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  
  // Aquí definimos el Output
  @Output() selectedFileChange = new EventEmitter<File>();
  
  selectedFile!: File;

  protected imgSrc;

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
}
