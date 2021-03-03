import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProducserviceService } from '../../service/producservice.service';
import { Observable } from 'rxjs';
import { CustomerService } from '../../service/customer.service';
import { BillService } from '../../service/bill.service';
import { Bill } from '../../model/bill';
import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/dir-document-token';
import { Customer } from 'src/app/model/customer';
import { OrderService } from 'src/app/service/order.service';


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
    unpaidAmount: 0,
    newOrders: 0,
    shippedOrders: 0,
  };

  productChartData: [string, number][] = [];
  productChartColors = ['#49A54D', '#FF0000'];
  billChartData: [string, number][] = [];
  billChartColors = ['#3399FF', '#FFA523'];
  customerChartData: [string, number][] = [];
  customerChartColors = ['#3399FF', '#FFA523'];
  orderStatusChartData: [string, number][] = [];
  orderStatusChartColors = ['#49A54D', '#FF0000', '#3399FF'];

  newProductsList: Product[] = [];

  constructor(
    private productService: ProducserviceService,
    private customerService: CustomerService,
    private billService: BillService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getInfoData();
    this.newProducts();
  }

  public getInfoData(): void
  {

    // Active Products.
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

    //Unpaid Bills.
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

    // Active Customers.
    this.customerService.getAll().subscribe((customers) => {
      this.infoData.activeCustomers = customers.filter(c => c.active).length;

      // const activePercent = Math.round((this.infoData.activeCustomers / customers.length) * 100);
      //  const inactivePercent = 100 - activePercent;

      //  const data: [string, number][] = [
      //   ['Active', activePercent],
      //   ['Inactive', inactivePercent]
      //  ];
      //  this.customerChartData = data;
      
    });

    // Order Status.
    this.orderService.list$.subscribe((orders) => {
      this.infoData.newOrders = orders.filter(o => o.status === 'new').length;
      this.infoData.shippedOrders = orders.filter(o => o.status === 'shipped').length;

      const newOrderPercent = Math.round((this.infoData.newOrders / orders.length) * 100);
      const shippedOrderPercent = Math.round((this.infoData.shippedOrders / orders.length) * 100);
      const paidOrderPercent = 100 - (newOrderPercent + shippedOrderPercent);

      const data: [string, number][] = [
       ['New', newOrderPercent],
       ['Shipped', shippedOrderPercent],
       ['Paid', paidOrderPercent],
      ];
      this.orderStatusChartData = data;

    });

    this.orderService.getAll();

  }

  public newProducts(): void {
    this.productService.list$.subscribe((products: Product[]) => {
      products.sort((a: Product, b: Product) => {
        return Number(a.id) - Number(b.id);
      });
      this.newProductsList = products;
    });

    this.productService.getAll();
  }




}
