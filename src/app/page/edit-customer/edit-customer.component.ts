import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../model/customer';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer: Customer = new Customer();
/*
  categories: {id: number, category: string}[] = [
    {id: 0, category: 'Documentary'},
    {id: 1, category: 'Comedy'},
    {id: 2, category: 'Western'},
    {id: 3, category: 'Horror'},
    {id: 4, category: 'Action'},
    {id: 5, category: 'Romance'},
    {id: 6, category: 'Drama'},
    {id: 7, category: 'Sci-Fi'}

  ];*/

  constructor(
    private customerService: CustomerService,
    private rout: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {


  this.rout.params.subscribe( params => {
    if (params.id != '0') {
      this.customerService.get(params.id).forEach( customer => {
        this.customer = customer;
      });
    }

  });

}

onSave() {
  if (this.customer.id) {

    this.customerService.update(this.customer).subscribe((p: Customer) => {
      this.toastr.success('The item was saved successfully!');
      this.router.navigate(['customer']);
    });

  } else {

    this.customerService.create(this.customer).subscribe((p: Customer) => {
      this.toastr.success('The item was saved successfully!');
      this.router.navigate(['customers']);
    });

  }
}
/*
onTypeSelect(event: Event): void
{
  const id = (event.target as HTMLInputElement).value;
  const result = this.categories.find(c => c.id == Number(id));
  if (result) {
    this.customer.type = result.category;
  }
}
*/
  ngOnInit(): void {
  }

}
