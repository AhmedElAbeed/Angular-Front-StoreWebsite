import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = 'http://localhost:3001/api/users';

  constructor(private http: HttpClient) { }

  // Register method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError) // Error handling
    );
  }

  // Login method
  loginUser(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login-user`; // Fixed URL format
    const body = { email: email, password: password };

    return this.http.post<any>(url, body).pipe(
      catchError(this.handleError) // Error handling
    );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('Error during HTTP request:', error);
    return throwError('Something went wrong. Please try again.'); // Return a user-friendly error message
  }
}
