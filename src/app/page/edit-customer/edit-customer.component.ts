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
      this.router.navigate(['customers']);
    });

  } else {

    this.customerService.create(this.customer).subscribe((p: Customer) => {
      this.toastr.success('The item was saved successfully!');
      this.router.navigate(['customers']);
    });

  }
}

  ngOnInit(): void {
  }

}
