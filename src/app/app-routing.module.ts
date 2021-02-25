import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },

  {
    path: 'bill/:id',
    component: EditBillComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
