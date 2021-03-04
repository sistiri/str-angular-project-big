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

  cols: { title: string, key: string } [] = [
    { key: 'id', title: 'ID' },
    { key: 'orderID', title: 'Order ID' },
    { key: 'amount', title: 'Amount' },
    { key: 'status', title: 'Status' },
  ];
  lastDragKey = '';

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

    totalLength: any;
    page: number = 1;

  onHeaderDragStart(event: DragEvent): void {
    this.lastDragKey = (event.target as HTMLTableHeaderCellElement).id;
  }

  onHeaderDrop(event: DragEvent): void {
    event.preventDefault();
    const targetID: string = (event.target as HTMLTableHeaderCellElement).id;
    const from = this.cols.findIndex(col => col.key === this.lastDragKey);
    const to = this.cols.findIndex(col => col.key === targetID);
    const temp = Object.assign({}, this.cols[from]);
    this.cols.splice(from, 1);
    this.cols.splice(to, 0, temp);
  }

  ngOnInit(): void {
    this.billList$.subscribe(items => {
    this.totalLength = items.length;
    });
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
    if (confirm("Are you sure you want to delete the bill?")) {
      this.billService.remove(bill).subscribe(() => {
        this.billService.getAll();
        this.toastr.error('The bill was deleted sucessfully');
      });
    }
  }

  onFilter(key:string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.billService.like(key, value).subscribe((list: Bill[]) => {
      this.billList$.next(list);
    });
  }

}
