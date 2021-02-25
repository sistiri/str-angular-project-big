import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillListComponent } from './page/bill-list/bill-list.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';

const routes: Routes = [

  {
    path: 'orders',
    component: OrderListComponent
  },

  {
    path: 'product',
    component: ProductListComponent
  },

  {
    path: 'bill',
    component: BillListComponent
  },

  {
    path: 'product/:id',
    component: EditProductComponent
  },

  {
    path: 'bills',
    component: BillListComponent
  },

  {
    path: '',
    component: DashboardComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
