import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillListComponent } from './page/bill-list/bill-list.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderListComponent } from './page/order-list/order-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'orders',
    component: OrderListComponent
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
