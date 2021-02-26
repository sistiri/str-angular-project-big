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

  productList$: BehaviorSubject<Product[]> = this.productService.list$;

  order: string = 'name';
  reverse: boolean = false;

  constructor(
    private productService : ProducserviceService,
  ) { }

  ngOnInit(): void {
    this.productService.getAll();
  }

  setOrder(value: string): void
  {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  onDelete(product: Product) {

    this.productService.remove(product).subscribe(r => {
      this.productService.getAll();
    });
  }

  onFilter(key:string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.productService.like(key, value).subscribe((list: Product[]) => {
      this.productList$.next(list);
    });
  }

}
