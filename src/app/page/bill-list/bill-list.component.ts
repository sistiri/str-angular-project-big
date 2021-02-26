import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Bill } from 'src/app/model/bill';

import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {

  billList$: BehaviorSubject<Bill[]> = this.billService.list$;
  // customerList$: BehaviorSubject<bill[]> = this.billService.list$;

  order: string = 'name';
  reverse: boolean = false;

  constructor(
    private billService: BillService,
    private toastr: ToastrService,
    // private customerService: CustomerService,
    // private billService: billService ,
  ) { }

  ngOnInit(): void {
    this.billService.getAll();
    // this.customerService.getAll();

  }

  setOrder(value: string): void
  {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  onDelete(bill: Bill) {

    this.billService.remove(bill).subscribe(() => {
      this.billService.getAll();
      this.toastr.error('The Bill was deleted sucessfully');
    });
  }

  onFilter(key:string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.billService.like(key, value).subscribe((list: Bill[]) => {
      this.billList$.next(list);
    });
  }

}
