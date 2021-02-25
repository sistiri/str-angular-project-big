import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bill } from 'src/app/model/bill';
import { CustomerService } from 'src/app/service/customer.service';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {


  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  // customerList$: BehaviorSubject<bill[]> = this.billService.list$;

  constructor(
    private billService: BillService,
    // private customerService: CustomerService,
    // private productService: ProductService ,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
    // this.customerService.getAll();

  }



}
