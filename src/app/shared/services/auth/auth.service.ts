import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/api/users';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}
  private username: string | null = null;
  private userRole: string | null = null;
  // Register method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  // Login method
  loginUser(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login-user`;
    const body = { email, password };

    return this.http.post<any>(url, body).pipe(
      tap(response => {
        // Handle the login response
        if (response.token && response.username && response.role) {
          this.handleLogin(response.userId, response.username, response.role, response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Save login information in cookies and localStorage
  handleLogin(userId: string, username: string, role: string, token: string) {
    const cookieExpirationDays = 7;

    // Set cookies
    this.cookieService.set('token', token, cookieExpirationDays, '/', '', true, 'Strict');
    this.cookieService.set('role', role, cookieExpirationDays, '/', '', true, 'Strict');
    this.cookieService.set('username', username, cookieExpirationDays, '/', '', true, 'Strict');


    // Set localStorage
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username); // Ensure username is correctly set in localStorage
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);

    console.log('Username set in localStorage:', username); // Debugging username
    this.router.navigate(['/']);
  }
  setUser(username: string, role: string): void {
    this.username = username;
    this.userRole = role;
  }

  // Logout method
  logout() {
    // Clear cookies and localStorage data on logout
    this.cookieService.delete('token');
    this.cookieService.delete('role');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.cookieService.check('token') && localStorage.getItem('isLogged') === 'true';
  }

  // Get username from localStorage
  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Get user role from localStorage
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('Error during HTTP request:', error);
    return throwError(error.message || 'Something went wrong. Please try again.');
  }
}
