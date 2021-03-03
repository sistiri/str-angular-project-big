import { Customer } from './../../model/customer';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList$: BehaviorSubject<Customer[]> = this.customerService.list$;

  tableDataSource: MatTableDataSource<Customer> = new MatTableDataSource();

  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'address',
    'address.zip',
    'address.country',
    'address.city',
    'address.street',
    'address.notes',
    'active'
  ];

  cols: { title: string, key: string } [] = [
    { key: 'first_name', title: 'FirstName' },
    { key: 'last_name', title: 'LastName' },
    { key: 'email', title: 'Email' },
    { key: 'address.zip', title: 'Zip'},
    { key: 'address.country', title: 'Country'},
    { key: 'address.city', title: 'City'},
    { key: 'address.street', title: 'Street'},
    { key: 'address.notes', title: 'Notes'},
    { key: 'active', title: 'Active'},
  ];

  lastDragKey = '';

  order: string = 'name';
  reverse: boolean = false;

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
   ) { }

    //Paginator
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

    this.customerList$.subscribe(items => {
      this.tableDataSource.data = items;
      this.totalLength = items.length; //paginator
    });

    this.customerService.getAll();
  }

  setOrder(value: string): void {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  onDelete(order: Customer) {
    if (confirm("Are you sure you want to delete the item?")) {
       this.customerService.remove(order).subscribe(r => {
      this.customerService.getAll();
      this.toastr.error('The item was deleted successfully');
    });
    }
  }

  onFilter(key:string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.customerService.like(key, value).subscribe((list: Customer[]) => {
      this.customerList$.next(list);
    });
  }

}
