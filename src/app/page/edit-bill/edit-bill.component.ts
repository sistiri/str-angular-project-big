import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/service/bill.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Bill } from 'src/app/model/bill';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-edit-bill',
  templateUrl: './edit-bill.component.html',
  styleUrls: ['./edit-bill.component.scss']
})
export class EditBillComponent implements OnInit {
  [x: string]: any;

  bills$: Observable<Bill> = this.activatedRoute.params.pipe(
    switchMap( params => this.billService.get(params.id) )
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private billService: BillService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  clicked = false;

  onUpdate(form: NgForm, bill: Bill): void {
    if (this.bill.id === 0) {
      this.billService.create(bill);
      this.router.navigate([''])
    } else {
      this.billService.update(bill).subscribe(
        ev => this.router.navigate([''])
      );
    }
  }

}
