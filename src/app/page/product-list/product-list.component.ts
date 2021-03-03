import { Component, OnInit } from '@angular/core';
import { ProducserviceService } from '../../service/producservice.service';
import { Product } from '../../model/product';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList$: BehaviorSubject<Product[]> = this.productService.list$;

  tableDataSource: MatTableDataSource<Product> = new MatTableDataSource();

  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'description',
    'price',
    'featured',
    'active'
  ];

  cols: { title: string, key: string } [] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'type', title: 'Type' },
    { key: 'description', title: 'Description' },
    { key: 'price', title: 'Price'},
    { key: 'featured', title: 'Featured'},
    { key: 'active', title: 'Active'}
  ];

  lastDragKey = '';

  order: string = 'name';
  reverse: boolean = false;

  constructor(
    private productService: ProducserviceService,
    private toastr: ToastrService,
  ) { }

  //Paginator
  totalLength: any;
  page: number = 1;

  onHeaderDragStart(event: DragEvent): void {
    this.lastDragKey = (event.target as HTMLTableHeaderCellElement).id;
  }

  onHeaderDrop(event: DragEvent): void {
    event.preventDefault();
    const targetID: string = (event.target as HTMLTableHeaderCellElement).id;
    const from = this.cols.findIndex(col => col.key === this.lastDragKey);
    const to = this.cols.findIndex(col => col.key === targetID);
    const temp = Object.assign({}, this.cols[from]);
    this.cols.splice(from, 1);
    this.cols.splice(to, 0, temp);
  }

  ngOnInit(): void {

    this.productList$.subscribe(items => {
      this.tableDataSource.data = items;
      this.totalLength = items.length; //paginator
    });

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
    if (confirm("Are you sure you want to delete the item?")) {
      this.productService.remove(product).subscribe(() => {
        this.productService.getAll();
        this.toastr.error('The item was deleted successfully');
      });
    }
  }

  onFilter(key:string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.productService.like(key, value).subscribe((list: Product[]) => {
      this.productList$.next(list);
    });
  }


}
