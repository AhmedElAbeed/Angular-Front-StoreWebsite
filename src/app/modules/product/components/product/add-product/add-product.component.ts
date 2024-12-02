import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../model/Product.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  newProduct: Product = {
    _id: '',
    title: '',
    description: '',
    category: '',
    type: '',
    sizes: [],
    size: '',
    images: [],
    stock: '',
    price: 0,
    prevprice: 0,
    qty: 0,
    discount: 0,
    totalprice: 0,
    rating: {
      rate: 0,
      count: 0
    }
  };

  categories: any[] = [];
  selectedImages: File[] = [];
  previewImages: string[] = []; // Array for local previews

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories;
    });
  }

  // Upload images to the backend
  uploadImages(): Observable<string[]> {
    const formData = new FormData();
    this.selectedImages.forEach(image => formData.append('images', image));

    return this.productService.uploadImage(formData).pipe(
        map((response: { imageUrls: string[] }) => {
            if (response && response.imageUrls) {
                this.newProduct.images = response.imageUrls; // Set backend URLs directly
            } else {
                this.newProduct.images = []; // Clear if no images
            }
            return this.newProduct.images;
        })
    );
  }

  // Add product and handle image upload
  addProduct(form: NgForm): void {
    if (form.valid) {
      if (this.selectedImages.length > 0) {
        // Upload images first
        this.uploadImages().subscribe({
          next: (imageUrls) => {
            this.newProduct.images = imageUrls; // Set image URLs from backend response
            this.submitProduct(form); // Proceed to save the product
          },
          error: (err) => {
            console.error('Image upload error:', err);
            alert('Image upload failed. Please try again.');
          },
        });
      } else {
        this.submitProduct(form); // Save product without images
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Submit the new product to the backend
  submitProduct(form: NgForm): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: (response) => {
        alert('Product added successfully!');
        this.resetForm(form);
      },
      error: (error) => {
        alert('Failed to add product!');
      }
    });
  }

  // Image selection event handler
  onImageSelect(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedImages = Array.from(files); // Save files for upload
      this.previewImages = this.selectedImages.map(file => URL.createObjectURL(file)); // Create previews
    }
  }

  // Remove image from both selectedImages and previewImages
  removeImage(index: number): void {
    // Remove the image from the selectedImages array
    this.selectedImages.splice(index, 1);

    // Remove the preview from the previewImages array
    this.previewImages.splice(index, 1);
  }

  // Reset the form and state
  resetForm(form: NgForm): void {
    this.newProduct = {
        _id: '',
        title: '',
        description: '',
        category: '',
        type: '',
        sizes: [],
        size: '',
        images: [], // Clear images
        stock: '',
        price: 0,
        prevprice: 0,
        qty: 0,
        discount: 0,
        totalprice: 0,
        rating: { rate: 0, count: 0 }
    };
    form.resetForm();
    this.selectedImages = []; // Clear selected images
    this.previewImages = []; // Clear preview images
  }
}
