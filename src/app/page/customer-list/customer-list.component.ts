import { Component, OnInit } from '@angular/core';
import { ApplicationRef, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerList$: Observable<Customer[]>;

  rawCustomerKeys: Customer = new Customer();

  phrase: string = '';
  filterKey: string = 'last_name';
  filterKeyArray: string[];
  isSearchButtonVisible: boolean = true;

  columnKey: string = '';
  direction: string = '';

  constructor(private customerService: CustomerService, private router: Router) {
    this.customerList$ = this.customerService.getAll();

    let customerKeys = Object.getOwnPropertyNames(this.rawCustomerKeys);
    const zip = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[0];
    const country = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[1];
    const city = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[2];
    const street = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[3];
    const notes = Object.getOwnPropertyNames(this.rawCustomerKeys.address)[4];

    customerKeys.splice(4, 1, zip, country, city, street, notes);
    this.filterKeyArray = customerKeys;

  }

  ngOnInit(): void {
  }

  removeCustomer(id: number | string): void {
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
  }

  onFilter(key:string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.customerService.like(key, value).subscribe((list: Customer[]) => {
      //this.customerList$.next(list);
    });
  }

}
