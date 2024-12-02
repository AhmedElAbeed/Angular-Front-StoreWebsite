import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, throwError } from 'rxjs';
import { Product } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:3001/api/products'; // Full API URL
  products = new BehaviorSubject<Product[]>([]);
  ratingList: boolean[] = [];

  constructor(private http: HttpClient) {}

  // Fetch all products
  get get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      map((data) => {
        // Normalize or transform data if necessary
        return data.map((product) => ({ ...product }));
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error(error.message || 'Error fetching products'));
      })
    );
  }

  // Fetch products by category
  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, {
      params: new HttpParams().set('category', category)
    }).pipe(
      catchError((error) => {
        console.error('Error fetching products by category:', error);
        return throwError(() => new Error(error.message || 'Error fetching category'));
      })
    );
  }

  // Fetch related products by type
  getRelated(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, {
      params: new HttpParams().set('type', type)
    }).pipe(
      catchError((error) => {
        console.error('Error fetching related products:', error);
        return throwError(() => new Error(error.message || 'Error fetching related products'));
      })
    );
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error(error.message || 'Error fetching products'));
      })
    );
  }

  // Fetch a product by its ID
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching product by ID:', error);
        return throwError(() => new Error(error.message || 'Error fetching product'));
      })
    );
  }

  // Search products
  search(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, {
      params: new HttpParams().set('q', query)
    }).pipe(
      catchError((error) => {
        console.error('Error searching products:', error);
        return throwError(() => new Error(error.message || 'Error searching products'));
      })
    );
  }

  // Generate rating stars for a product
  getRatingStar(product: Product): boolean[] {
    this.ratingList = [];
    Array.from({ length: 5 }).forEach((_, index) => {
      this.ratingList.push(index + 1 <= Math.trunc(product?.rating.rate));
    });
    return this.ratingList;
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product); // Send the new product to the backend
  }

  
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/products/upload', formData);
  }

deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.url}/${productId}`); // Use this.url for consistency
  }
  // Fetch product by ID
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching product:', error);
        return throwError(() => new Error(error.message || 'Error fetching product'));
      })
    );
  }

  // Update product
  updateProduct(id: string, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, formData).pipe(
      catchError((error) => {
        console.error('Error updating product:', error);
        return throwError(() => new Error(error.message || 'Error updating product'));
      })
    );
  }

}