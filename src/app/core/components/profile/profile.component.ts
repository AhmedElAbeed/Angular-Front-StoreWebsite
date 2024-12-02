import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/auth/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  imageFile: File | null = null;
  user: any;
  profilePictureUrl: string = ''; // Full URL to display the profile picture
  newPasswordVisible: boolean = false; // Toggle for new password visibility
  confirmNewPasswordVisible: boolean = false; // Toggle for confirm new password visibility
  passwordStrength: string | null = null; // To show password strength

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadUserData();
  }

  initForms() {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );

    // Subscribe to value changes to check password strength
    this.passwordForm.get('newPassword')?.valueChanges.subscribe(value => {
      this.passwordStrength = this.getPasswordStrength(value);
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmNewPassword')?.value
      ? null
      : { mismatch: true };
  }

  loadUserData() {
    this.userService.getUserProfile().subscribe(
      (response) => {
        this.user = response.user;
        this.profilePictureUrl = `http://localhost:3001/${response.user.profilePicture}`; // Build the full image URL here
        this.profileForm.patchValue({
          username: this.user.username,
          email: this.user.email,
        });
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        alert('Failed to load user data');
      }
    );
  }

  onProfileSubmit() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      this.userService.updateProfile(updatedData).subscribe(
        (response) => {
          alert('Profile updated successfully');
          this.loadUserData();
        },
        (error) => {
          console.error('Profile update error:', error);
          alert('Error updating profile');
        }
      );
    }
  }

  onPasswordSubmit() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword } = this.passwordForm.value;
      this.userService.changePassword(currentPassword, newPassword).subscribe(
        (response) => {
          alert('Password changed successfully');
          this.passwordForm.reset();
        },
        (error) => {
          console.error('Password change error:', error);
          alert('Error changing password');
        }
      );
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  onUploadProfilePicture() {
    if (this.imageFile) {
      const formData = new FormData();
      formData.append('profilePicture', this.imageFile);
      this.userService.uploadProfilePicture(formData).subscribe(
        (response) => {
          alert('Profile picture updated successfully');
          this.loadUserData(); // Reload user data to refresh the profile picture
        },
        (error) => {
          console.error('Profile picture upload error:', error);
          alert('Error uploading profile picture');
        }
      );
    }
  }

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmNewPasswordVisible = !this.confirmNewPasswordVisible;
  }

  getPasswordStrength(password: string): string | null {
    const strengthCriteria = [
      { regex: /(?=.*[0-9])/, strength: 'Weak' },
      { regex: /(?=.*[!@#$%^&*])/, strength: 'Medium' },
      { regex: /.{8,}/, strength: 'Strong' }
    ];

    let strength = 'Weak';
    for (const criterion of strengthCriteria) {
      if (criterion.regex.test(password)) {
        strength = criterion.strength === 'Weak' ? 'Medium' : 'Strong';
      }
    }

    return strength;
  }
}
