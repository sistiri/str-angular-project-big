import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {


  orderList$: BehaviorSubject<Order[]> = this.orderService.list$;

  tableDataSource: MatTableDataSource<Order> = new MatTableDataSource();

  displayedColumns: string[] = [
    'id',
    'customerId',
    'productID',
    'amount',
    'status',
  ]

  cols: { title: string, key: string } [] = [
    { key: 'id', title: 'ID' },
    { key: 'customerID', title: 'Customer ID' }, 
    { key: 'productID', title: 'Product ID' },
    { key: 'amount', title: 'Amount' },
    { key: 'status', title: 'Status' },
  ];

  lastDragKey = '';

  order: string = 'name';
  reverse: boolean = false;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
   ) { }

  ngOnInit(): void {
    this.orderService.getAll();
  }

  setOrder(value: string): void {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  onDelete(order: Order) {
    if (confirm("Are you sure you want to delete the item?")) {
       this.orderService.remove(order).subscribe(r => {
      this.orderService.getAll();
      this.toastr.error('The item was deleted successfully');
    });
    }
  }

  onFilter(key:string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.orderService.like(key, value).subscribe((list: Order[]) => {
      this.orderList$.next(list);
    });
  }

}
