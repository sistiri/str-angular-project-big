import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProducserviceService } from '../../service/producservice.service';
import { Observable } from 'rxjs';
import { CustomerService } from '../../service/customer.service';
import { BillService } from '../../service/bill.service';
import { Bill } from '../../model/bill';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  infoData = {
    activeProductCount: 0,
    activeCustomers: 0,
    unpaidBills: 0,
    unpaidAmount: 0
  }

  constructor(
    private productService: ProducserviceService,
    private customerService: CustomerService,
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.getInfoData();
  }

  public getInfoData()
  {
    this.productService.match('active', 'true').subscribe((items: Product[]) => {
      this.infoData.activeProductCount = items.length;
    });

    this.billService.match('status', 'new').subscribe((items: Bill[]) => {
      this.infoData.unpaidBills = items.length;
      this.infoData.unpaidAmount = items
        .map(i => i.amount)
        .reduce((a, b) => a + b, 0);
    });

  }

}
