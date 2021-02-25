import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { EditBillComponent } from './page/edit-bill/edit-bill.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    EditBillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,}),
  ],
  providers: [
    BillService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
