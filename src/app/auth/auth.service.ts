import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthControllerService } from '../connectors/api/api/authController.service';
import { LoginRequestWeb, RegisterRequestWeb, SocialLoginRequest, TokenResponse } from '../connectors/api';
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { environment } from "src/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken = new BehaviorSubject<string | null>(this.getToken());
  private auth: Auth;

  constructor(
    private router: Router,
    private authConnector: AuthControllerService
  ) {
    const app = initializeApp(environment.firebase);
    this.auth = getAuth(app);
  }

  login(credentials: LoginRequestWeb) {
    return this.authConnector.login(credentials).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  register(credentials: RegisterRequestWeb) {
    return this.authConnector.register(credentials).pipe(
      tap(response => {
        this.setToken(response.token);
      })
    );
  }

  logout() {
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

  async socialLoginGoogle(): Promise<{ token: string; expiresAt: string; isNewUser: boolean; user: User }> {
    const provider = new GoogleAuthProvider();

    try {
      // 1️⃣ Login con popup Firebase
      const result = await signInWithPopup(this.auth, provider);
      const firebaseUser = result.user;

      // 2️⃣ Obtener token de Firebase
      const idToken = await firebaseUser.getIdToken();

      // 3️⃣ Preparar request para backend
      const tokenRequest: SocialLoginRequest = { token: idToken };

      // 4️⃣ Llamar backend y esperar JWT propio
      const tokenResponse: TokenResponse = await firstValueFrom(
        this.authConnector.socialLogin(tokenRequest)
      );
      console.log(tokenResponse);
      
      // 5️⃣ Guardar JWT en localStorage (o donde uses)
      this.setToken(tokenResponse.token);

      // 6️⃣ Retornar token + info útil de usuario
      return {
        token: tokenResponse.token,
        expiresAt: tokenResponse.expiresAt.toString(),
        isNewUser: tokenResponse.isNewUser,
        user: firebaseUser,
      };

    } catch (err) {
      console.error('Error al hacer social login con Google', err);
      throw err; // puedes mapear a error más amigable si quieres
    }
  }
}
