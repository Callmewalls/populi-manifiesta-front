import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthControllerService } from '../connectors/api/api/authController.service';
import { Credentials } from '../connectors/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken = new BehaviorSubject<string | null>(this.getToken());
  
  constructor(
    private router: Router,
    private authConnector: AuthControllerService
  ) { }

  login(credentials: Credentials) {
    console.log(credentials);
    
    return this.authConnector.login(credentials).pipe(
      tap(response => {
        this.setToken(response);
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.authToken.next(null);
    this.router.navigate(['/login']);
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
    this.authToken.next(token);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
