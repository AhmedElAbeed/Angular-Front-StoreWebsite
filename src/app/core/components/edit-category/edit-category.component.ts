import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/modules/product/services/category.service';
import { Category } from 'src/app/modules/product/model/Category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  categoryId!: string; // Use string to match the ID type from the backend

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!; // Retrieve the category ID from the route
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
    });
    this.fetchCategory(); // Fetch the category details to populate the form
  }

  fetchCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe(
      (category: Category) => {
        this.categoryForm.patchValue(category); // Populate form with category data
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.categoryService.updateCategory(this.categoryId, this.categoryForm.value).subscribe(
        () => {
          this.successMessage = 'Category updated successfully!';
          this.router.navigate(['/list-categories']); // Navigate back to list of categories after update
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Failed to update category. Please try again.';
        }
      );
    }
  }
}
