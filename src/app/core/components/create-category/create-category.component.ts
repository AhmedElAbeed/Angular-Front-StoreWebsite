import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/modules/product/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
})
export class CreateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null; // Declare successMessage

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categoryService.createCategory(this.categoryForm.value).subscribe(
        (response) => {
          this.successMessage = 'Category created successfully!'; // Set success message
          this.errorMessage = null; // Clear any previous error messages
          this.categoryForm.reset(); // Reset the form
          this.router.navigate(['/list-categories']); // Redirect after success
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to create category. Please try again.'; // Handle error
          this.successMessage = null; // Clear any previous success messages
        }
      );
    }
  }
}
