import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [FormsModule, ButtonModule, InputTextModule, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent {

  protected registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/) // 1 mayúscula + 1 número
        ]
      ],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    },
      { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void { }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }

  register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formValue = this.registerForm.value;

    const payload = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password
    };

    // this.authService.register(payload).subscribe({
    //   next: () => {
    //     this.loading = false;
    //     this.router.navigate(['/home']);
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     this.errorMessage = err?.error?.message || 'Error al registrarse';
    //   }
    // });
  }
}
