import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductdetailComponent } from './components/product/productdetail/productdetail.component';
import { ProductcardComponent } from './components/product/productcard/productcard.component';
import { FilterComponent } from './components/product/filter/filter.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductRoutingModule } from './product-routing.module';
import { BreadcrumbComponent } from 'src/app/core/components/breadcrumb/breadcrumb.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PricefilterComponent } from './components/product/filter/pricefilter/pricefilter.component';
import { ProgressDirective } from './components/product/filter/pricefilter/directive/progress.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
@NgModule({
  declarations: [
    ProductComponent,
    ProductdetailComponent,
    ProductcardComponent,
    FilterComponent,
    CheckoutComponent,
    BreadcrumbComponent,
    PricefilterComponent,
    ProgressDirective,
    AddProductComponent,
    ProductListComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  
})
export class ProductModule { 
}
