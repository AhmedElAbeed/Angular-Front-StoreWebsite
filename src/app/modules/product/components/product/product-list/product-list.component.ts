import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model/Product.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedImage: string = '';
  isModalOpen: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.get.subscribe({
      next: (data: Product[]) => {
        this.products = data; // Assign fetched products
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        alert('Failed to load products.');
      }
    });
  }

  viewImage(imageUrl: string): void {
    this.selectedImage = 'http://localhost:3001' + imageUrl; // Prepend server URL to image path
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  deleteProduct(productId: string): void {
    console.log('Deleting product with ID:', productId); // Check the ID being passed
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: (response) => {
          alert('Product deleted successfully!');
          this.loadProducts(); // Reload product list
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product.');
        }
      });
    }
  }
  updateProduct(productId: string): void {
    // Use Router to navigate to the update product page
    this.router.navigate([`/update-product/${productId}`]);
  }



}
