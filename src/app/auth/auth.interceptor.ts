import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    const authReq =
      token && req.method !== 'OPTIONS'
        ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        })
        : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expirado o no autorizado
          localStorage.removeItem('token'); // limpiar token
          this.router.navigate(['/auth/login']); // redirigir al login
        }
        return throwError(() => error);
      })
    );
  }
}
