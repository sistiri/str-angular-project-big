import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProducserviceService {

  JsonUrl: string = "http://localhost:3000/products";

  productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }

  getAll(): void {
    this.productList$.next([]);
    this.http.get<Product[]>(this.JsonUrl).subscribe(
      products => this.productList$.next(products)
    );
  }

  get( id: number | string ): Observable<Product> {
    id = parseInt(('' + id), 10);
    return this.http.get<Product>(`${this.JsonUrl}/${id}`);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(
     `${this.JsonUrl}/${product.id}`,
     product
    ).pipe(
      tap( () =>{
        this.getAll();
        this.toastr.info('The Bill has been uodated.', 'UPDATED');
      })
    );
  }

  create(product: Product): void {
    this.http.post<Product>(
      `${this.JsonUrl}`,
      product
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.success('The Bill has been created.', 'NEW EVENT');
  }

  remove(product: Product): void {
    this.http.delete<Product>(
      `${this.JsonUrl}/${product.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.warning('The Bill has been deleted.', 'DELETED');
  }

}
