import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { FooterComponent } from './common/footer/footer.component';
import { BillService } from './service/bill.service';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderListComponent } from './page/order-list/order-list.component';
import { ProductListComponent } from './page/product-list/product-list.component';


import { InfoCardComponent } from './common/info-card/info-card.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { BillListComponent } from './page/bill-list/bill-list.component';
<<<<<<< HEAD
=======
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';


>>>>>>> origin/dev


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    OrderListComponent,
    ProductListComponent,
    InfoCardComponent,
    EditProductComponent,
<<<<<<< HEAD
    BillListComponent
=======
    EditOrderComponent,
    BillListComponent,
    CustomerListComponent
>>>>>>> origin/dev
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
<<<<<<< HEAD

=======
    OrderModule,
    FormsModule,
>>>>>>> origin/dev
  ],
  providers: [
    BillService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
