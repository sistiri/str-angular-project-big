import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

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


import { InfoCardComponent } from './common/info-card/info-card.component';
import { EditProductComponent } from './page/edit-product/edit-product.component';
import { OrderListComponent } from './page/order-list/order-list.component';
import { ProductListComponent } from './page/product-list/product-list.component';
import { EditCustomerComponent } from './page/edit-customer/edit-customer.component';
import { BillListComponent } from './page/bill-list/bill-list.component';
import { EditOrderComponent } from './page/edit-order/edit-order.component';
import { CustomerListComponent } from './page/customer-list/customer-list.component';
import { OrderModule } from 'ngx-order-pipe';
import { StatusCardComponent } from './common/status-card/status-card.component';
import { TableCardComponent } from './common/table-card/table-card.component';
import { EditBillComponent } from './page/edit-bill/edit-bill.component';

import { GoogleChartsModule } from 'angular-google-charts';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { InterceptorService } from './service/interceptor.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment.prod';
import { NewCustomerCardComponent } from './new-customer-card/new-customer-card.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { CustomersCardComponent } from './common/customers-card/customers-card.component';

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
    EditCustomerComponent,
    EditOrderComponent,
    BillListComponent,
    EditBillComponent,
    CustomerListComponent,
    StatusCardComponent,
    TableCardComponent,
    NewCustomerCardComponent,
    CustomersCardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    FormsModule,
    OrderModule,
    MatTableModule,
    GoogleChartsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
