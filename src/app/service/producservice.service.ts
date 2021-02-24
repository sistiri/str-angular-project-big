import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProducserviceService {

  JsonUrl: string = "http://localhost:3000/product";



  constructor( private http: HttpClient, private toastr: ToastrService ) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Product[]>(this.JsonUrl).subscribe(
      products => this.list$.next(products)
    );
  }

  get( id: number | string ): Observable<Product> {
    id = parseInt(('' + id), 10);
    return this.http.get<Product>(`${this.JsonUrl}/${id}`);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(
     `${this.JsonUrl}/${product.id}`,
     Product
    ).pipe(
      tap( () =>{
        this.getAll();
        this.toastr.info('The Product has been uodated.', 'UPDATED');
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
    this.toastr.success('The Product has been created.', 'NEW EVENT');
  }

  remove(product: Product): void {
    this.http.delete<Product>(
      `${this.JsonUrl}/${product.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.warning('The Product has been deleted.', 'DELETED');
  }



}
