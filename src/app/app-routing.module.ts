import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { CartComponent } from './core/components/cart/cart.component';
import { Page404Component } from './core/components/page404/page404.component';
import { CheckoutComponent } from './modules/product/components/checkout/checkout.component';
import { canActivate } from './shared/services/auth/authguard.service';
import { SearchresultComponent } from './core/components/searchresult/searchresult.component';
import { CreateCategoryComponent } from './core/components/create-category/create-category.component'; 
import { ListCategoriesComponent } from './core/components/list-categories/list-categories.component';
import { EditCategoryComponent } from './core/components/edit-category/edit-category.component';
import { ProfileComponent } from './core/components/profile/profile.component';
import { AddProductComponent } from './modules/product/components/product/add-product/add-product.component';
import { ProductListComponent } from './modules/product/components/product/product-list/product-list.component';
import { UpdateProductComponent } from './modules/product/components/product/update-product/update-product.component';
import { ProductdetailComponent } from './modules/product/components/product/productdetail/productdetail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: SearchresultComponent },
  { path: 'categories', loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) },
  { path: 'shopping-cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [canActivate] },
  { path: 'create-category', component: CreateCategoryComponent, canActivate: [canActivate] },
  { path: 'list-categories', component: ListCategoriesComponent, canActivate: [canActivate] },
  { path: 'edit-category/:id', component: EditCategoryComponent }, // Edit category route
  { path: 'profile', component: ProfileComponent }, // Add profile route
  { path: 'add-product', component: AddProductComponent },
  { path: 'list-product', component: ProductListComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },  // Update product by ID
  { path: 'product/:_id', component: ProductdetailComponent },
  




  { path: '**', component: Page404Component, data: { message: 'Oops... This is a Bad request' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
