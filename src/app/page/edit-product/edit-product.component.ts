import { Component, OnInit } from '@angular/core';
import { ProducserviceService } from '../../service/producservice.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../model/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();

  constructor(
    private productService: ProducserviceService,
    private rout: ActivatedRoute,
    private toastr: ToastrService
  ) {

    this.rout.params.subscribe( params => {
      this.productService.get(params.id).forEach( product => {
        this.product = product;
      });
    });

  }

  onSave() {
    this.toastr.success('Sikeres mentés!');
  }

  ngOnInit(): void {
  }

}
