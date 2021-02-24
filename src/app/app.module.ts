import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { FooterComponent } from './common/footer/footer.component';
import { BillService } from './service/bill.service';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    BillService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
