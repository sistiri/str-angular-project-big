import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  order: Order = new Order();

  customerIDControl: FormControl= new FormControl (0, [Validators.min(1)]);
  productIDControl: FormControl= new FormControl (0, [Validators.min(1)]);
  amountControl: FormControl= new FormControl (0, [Validators.min(1)]);

   orderStatus: { id: number, status: string }[] = [
    { id: 0, status: 'new' },
    { id: 1, status: 'shipped' },
    { id: 2, status: 'paid' },
   ];

  constructor(
    private orderService: OrderService,
    private rout: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.rout.params.subscribe(params => {
      if (params.id != '0') {
        this.orderService.get(params.id).forEach(order => {
        this.order = order;
      });
      }
    })
  }

  ngOnInit(): void {
  }

  onSubmit(order: Order): void {

    if (this.order.id) {
      this.orderService.update(this.order).subscribe(
        (ord: Order) => {
          this.toastr.success('The item has been updated succesfully!');
          this.orderService.getAll();
          this.router.navigate(['orders'])
        });

    } else {
      this.orderService.create(this.order).subscribe(
        (ord: Order) => {
          this.toastr.success('The item has been saved succesfully!');
          this.orderService.getAll();
          this.router.navigate(['orders']);
        });
    }


  }

  // onTypeSelect(event: Event): void
  // {
  //   const id = (event.target as HTMLInputElement).value;
  //   const result = this.orderStatus.find(order => order.id == Number(id));
  //   if (result) {
  //     this.order.status = result.status;
  //   }
  // }


}
