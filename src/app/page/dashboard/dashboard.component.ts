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
  };

  productChartData: [string, number][] = [];
  productChartColors = ['#49A54D', '#FF0000'];
  billChartData: [string, number][] = [];
  billChartColors = ['#3399FF', '#FFA523'];

  constructor(
    private productService: ProducserviceService,
    private customerService: CustomerService,
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.getInfoData();
  }

  public getInfoData(): void
  {

    this.productService.list$.subscribe((items: Product[]) => {

       this.infoData.activeProductCount = items.filter(i => i.active).length;
       const activePercent = Math.round((this.infoData.activeProductCount / items.length) * 100);
       const inactivePercent = 100 - activePercent;

       const data: [string, number][] = [
        ['Active', activePercent],
        ['Inactive', inactivePercent]
       ];
       this.productChartData = data;

    });

    this.productService.getAll();

    this.billService.list$.subscribe((items: Bill[]) => {
      const unpaid = items.filter(i => i.status === 'new');
      this.infoData.unpaidBills = unpaid.length;
      this.infoData.unpaidAmount = unpaid
        .map(i => i.amount)
        .reduce((a, b) => a + b, 0);

      const paidPercent = Math.round((this.infoData.unpaidBills / items.length) * 100);
      const unpaidPercent = 100 - paidPercent;

      const data: [string, number][] = [
        ['Paid', paidPercent],
        ['Unpaid', unpaidPercent]
       ];

      this.billChartData = data;

    });

    this.billService.getAll();



  }

}
