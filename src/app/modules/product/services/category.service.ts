import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3001/api/categories';

  constructor(private http: HttpClient) {}
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:3001/api/products/upload', formData);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post(this.apiUrl, category);
  }
  
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateCategory(id: string, category: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
