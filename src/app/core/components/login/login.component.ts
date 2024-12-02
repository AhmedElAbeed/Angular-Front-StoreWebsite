// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form group in the constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loading = true;
      this.errorMessage = null; // Clear previous error messages
  
      this.authService.loginUser(email, password).subscribe(
        (response) => {
          console.log('Login response:', response);
          const { token, userId, username, role } = response; // Extract userId, username, role, and token correctly
  
          // Store token, user data, and navigate
          if (token) {
            this.authService.handleLogin(userId, username, role, token);
            alert('Bienvenue'); // Welcome message
            this.router.navigate(['/']); // Navigate to home
          } else {
            alert('Token manquant dans la réponse.');
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          alert(this.errorMessage);
        },
        () => {
          this.loading = false;
        }
      );
    } else {
      alert('Please enter a valid email and password.');
    }
  }
  
}
