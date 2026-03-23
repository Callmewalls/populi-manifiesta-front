import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestWeb } from 'src/app/connectors/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false
})
export class LoginComponent {

  protected loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  login() {
    let credentials: LoginRequestWeb = {
      username: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    }

    this.authService.login(credentials).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.log(err)

    })
  }

  loginWithGoogle() {
    this.authService.socialLoginGoogle()
      .then(user => {
        console.log('Registro exitoso:', user);
        this.router.navigateByUrl("/home")
      })
      .catch(err => console.error('Error en registro:', err));
  }
}
