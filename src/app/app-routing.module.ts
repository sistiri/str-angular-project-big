import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { ProductListComponent } from './page/product-list/product-list.component';

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
    component: ProductListComponent
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
