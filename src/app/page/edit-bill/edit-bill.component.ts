import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/service/bill.service';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {


  status = ['bill.status'];

  bill: Bill = new Bill();

  orderIDControll: FormControl= new FormControl (0, [Validators.min(1)]);
  amountControll: FormControl= new FormControl (0, [Validators.min(1)]);

  billStatus: { id: number, status: string }[] = [
    { id: 0, status: 'new' },
     { id: 1, status: 'paid' },
    ];

  constructor(
    private billService: BillService,
    private rout: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
   ) {
    this.rout.params.subscribe( params => {
      if (params.id != '0'){
      this.billService.get(params.id).forEach( bill => {
        this.bill = bill;
      });
    }
   });
  }

  onSave() {
    if (this.bill.id) {
      this.billService.update(this.bill).subscribe((p: Bill) => {
        this.toastr.success('The item was saved successfully!');
        this.router.navigate(['bill']);
      });

    }else{
      this.billService.create(this.bill).subscribe((p: Bill) => {
        this.toastr.success('The item was saved successfully!');
        this.router.navigate(['bill']);
      });
    }
  }

    ngOnInit(): void {}

}
