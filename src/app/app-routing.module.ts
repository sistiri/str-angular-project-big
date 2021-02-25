import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { BillListComponent } from './page/bill-list/bill-list.component';

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
    path: 'product/:id',
    component: EditProductComponent
  },

  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'bills',
    component: BillListComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
