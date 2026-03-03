import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Credentials } from '../../connectors/api/model/credentials';
import { LoginRequestWeb } from 'src/app/connectors/api';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ButtonModule, InputTextModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  protected loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  )
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    
  }

  login(){
    let credentials: LoginRequestWeb = {
      username: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    }
    
    this.authService.login(credentials).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.log(err)
      
    })
  }
}
