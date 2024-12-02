import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user: any = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    terms: false
  };

  constructor(private authService: AuthentificationService) {}

  onSubmit(form: NgForm) {
    // Check if form is valid and passwords match
    if (form.valid && this.user.password === this.user.repeatPassword) {
      this.authService.register(this.user).subscribe(
        response => {
          console.log('Registration successful!', response);
          alert('Registration successful!');
          // Optionally, navigate to another page or clear form fields
        },
        error => {
          console.error('Registration error', error);
          alert('Error during registration. Please try again.');
        }
      );
    } else {
      alert('Please fill in all fields correctly, and make sure passwords match.');
    }
  }
}
