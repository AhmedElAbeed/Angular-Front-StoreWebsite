import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styles: []
})
export class ProductdetailComponent implements OnInit {
  isLoading = true; // Starts with loading state
  selectedSize!: string;
  category!: string;
  cart: Product[] = [];
  relatedProductList: Product[] = [];
  ratingList: boolean[] = [];
  images!: string[];
  product!: Product;
  imageSrc!: string;
  selectedImage!: number;
  discount = 0;
  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.cart = this.cartService.getCart;
  }

  // Fetch product details from the service
  getProduct(): void {
    this.isLoading = true;
    const _id = this.route.snapshot.params['_id'];

    this.productService.getProduct(_id).subscribe(
      (data) => {
        this.isLoading = false;
        this.product = data;
        this.images = data.images || []; // Ensure images exist as an array
        this.imageSrc = this.images[0] ? `http://localhost:3001${this.images[0]}` : ''; // Default to the first image
        this.category = data.category;
        this.title = data.title;
        this.discount = Math.round(100 - (data.price / data.prevprice) * 100); // Calculate discount
        this.getRatingStar();
        this.relatedProducts(); // Fetch related products
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching product:', error);
      }
    );
  }

  // Get star rating for the product
  getRatingStar(): void {
    this.ratingList = this.productService.getRatingStar(this.product);
  }

  // Fetch related products based on product type
  relatedProducts(): void {
    this.isLoading = true;
    this.productService.getRelated(this.product.type).subscribe((data) => {
      this.relatedProductList = data.filter((item: Product) => {
        this.isLoading = false;
        return this.product._id !== item._id; // Exclude the current product
      });
    });
  }

  // Add product to cart
  addToCart(product: Product): void {
    this.cartService.add(product);
  }

  // Remove product from cart
  removeFromCart(product: Product): void {
    this.cartService.remove(product);
  }

  // Check if product is already in the cart
  isProductInCart(product: Product): boolean {
    return this.cart.some((item) => item._id === product._id);
  }

  // Set selected size
  addSize(value: string, index: string): void {
    this.selectedSize = index;
    this.product.size = value;
  }

  // Change the main image when a thumbnail is clicked
  onImage(value: string, index: number): void {
    this.imageSrc = `http://localhost:3001${value}`; // Full URL for the clicked image
    this.selectedImage = index; // Update the selected index
  }
}
