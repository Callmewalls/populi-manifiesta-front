import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-profile-manager',
  templateUrl: './profile-manager.component.html',
  styleUrl: './profile-manager.component.scss',
  standalone: false
})
export class ProfileManagerComponent {

  selectedFile!: File;

  profileForm!: FormGroup;
  imgSrc: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      profileImage: [''],
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      bio: ['']
    });
  }

  onProfileImageChange($event) {

  }

  onCancel() {

  }

  onSubmit(){
    
  }
  
  
  onFileSelected(file: File) {
    this.selectedFile = file;
  }
}
