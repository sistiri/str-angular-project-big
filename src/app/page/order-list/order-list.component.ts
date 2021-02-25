import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/model/order';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {


  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;
  // customerList$: BehaviorSubject<Order[]> = this.orderService.list$;

  constructor(
    private orderService: OrderService,
    // private customerService: CustomerService,
    // private productService: ProductService ,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll();
    // this.customerService.getAll();
    
  }

  

}
