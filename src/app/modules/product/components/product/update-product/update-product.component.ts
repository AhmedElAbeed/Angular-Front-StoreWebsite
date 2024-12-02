import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../model';
import { Category } from '../../../model/Category.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  product: Product = {} as Product;
  categories: Category[] = [];
  previewImages: string[] = [];
  isImageUpdated: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
    this.loadCategories();

    // Initialize arrays if undefined
    this.product.sizes = this.product.sizes || [];
    this.product.rating = this.product.rating || { rate: 0, count: 0 };
  }

  // Load product details from API
  loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
  
        // Ensure product.images exists and is properly set
        this.product.images = this.product.images || [];
  
        // Map relative paths to absolute URLs for preview
        this.previewImages = this.product.images.map(
          (image) => `http://localhost:3001${image}` // Append base URL to relative paths
        );
      },
      (error) => {
        console.error('Error loading product:', error);
      }
    );
  }

  // Load category options
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  // Handle image selection
  onImageSelect(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.isImageUpdated = true;
      this.previewImages = []; // Reset previews when new images are selected

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push(e.target.result); // Add preview for UI
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Remove image from preview and product's image list
  removeImage(index: number): void {
    this.previewImages.splice(index, 1); // Remove from preview

    if (!this.isImageUpdated) {
      // Remove existing image from the product
      this.product.images.splice(index, 1);
    }
  }

  // Update product details
  updateProduct(): void {
    if (!this.product._id) {
      console.error('Product ID is missing!');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', this.product.title);
    formData.append('description', this.product.description);
    formData.append('category', this.product.category);
    formData.append('type', this.product.type);
    formData.append('sizes', this.product.sizes?.join(',') || '');
    formData.append('size', this.product.size || '');
    formData.append('rating', JSON.stringify(this.product.rating));
    formData.append('price', this.product.price.toString());
    formData.append('prevprice', this.product.prevprice?.toString() || '');
    formData.append('discount', this.product.discount?.toString() || '');
  
    // Correct way to send the rating object
    formData.append('rating', JSON.stringify(this.product.rating));
  
    // Append images to the form data
    if (this.isImageUpdated) {
      const imageFiles = (document.querySelector('input[type="file"]') as HTMLInputElement).files;
      if (imageFiles) {
        Array.from(imageFiles).forEach((file) => {
          formData.append('images', file, file.name);
        });
      }
    } else {
      // Include existing images as plain text
      this.product.images.forEach((image) => formData.append('images', image));
    }
  
    // Call update API
    this.productService.updateProduct(this.product._id, formData).subscribe(
      (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  // Reset form and state
  resetForm(productForm: NgForm): void {
    productForm.resetForm();
    this.previewImages = [];
    this.isImageUpdated = false;
    this.product = {} as Product;
  }
}
