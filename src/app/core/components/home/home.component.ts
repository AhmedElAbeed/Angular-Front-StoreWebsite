import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product/model';
import { ProductService } from 'src/app/modules/product/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  skeletons: number[] = [...new Array(6)];
  error: string = '';
  isLoading: boolean = false;
  images: string[] = [
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1690561566_Fresh_Deals_on_Atta_and_Flours_Desktop.jpg?im=Resize=(1680,320)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1690405709_Month_End_Deals_On_Daily_Essentails_Desktop.jpg?im=Resize=(1680,320)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1690561220_bestsellingsmartphonesdesktop_D.jpg?im=Resize=(1680,320)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1688753500_1680x320rounded.jpg?im=Resize=(1680,320)",
  ];

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch products from the backend
  fetchProducts(): void {
    this.isLoading = true;

    this._productService.getProducts().subscribe(
      (data) => {
        this.isLoading = false;
        this.products = data; // Assign products from the backend
      },
      (error) => {
        this.isLoading = false;
        this.error = error.message || 'An error occurred while fetching products';
      }
    );
  }
}
