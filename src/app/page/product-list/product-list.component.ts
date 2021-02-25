import { Component, OnInit } from '@angular/core';
import { ProducserviceService } from '../../service/producservice.service';
import { Product } from '../../model/product';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> = this.productService.productList$;

  constructor(
    private productService : ProducserviceService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

}
