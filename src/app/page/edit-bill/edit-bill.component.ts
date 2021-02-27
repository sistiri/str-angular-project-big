import { Component, OnInit } from '@angular/core';
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

  bill: Bill = new Bill();

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
        this.toastr.success('Sikeres mentés!');
        this.router.navigate(['bill']);
      });

    }else{
      this.billService.create(this.bill).subscribe((p: Bill) => {
        this.toastr.success('Sikeres mentés!');
        this.router.navigate(['bill']);
      });
    }
  }



  ngOnInit(): void {}


  onsubmit(bill: Bill): void {
    this.billService.update(bill).subscribe(
      saved => {
        this.billService.getAll();
        this.toastr.success('Adatok elküldve!');
        this.router.navigate(['bill'])
      }
    );
  }
}
