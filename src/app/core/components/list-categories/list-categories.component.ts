import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Category } from 'src/app/modules/product/model/Category.model';
import { CategoryService } from 'src/app/modules/product/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
})
export class ListCategoriesComponent implements OnInit {
  categories: Category[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(@Inject(CategoryService) private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  editCategory(id: string) {
    console.log(`Navigating to edit category with ID: ${id}`); // Log the ID for debugging
    this.router.navigate(['/edit-category', id]); // Navigate to the edit page with the category ID
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.successMessage = 'Category deleted successfully.';
          this.fetchCategories(); // Refresh the list
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
  }
}
