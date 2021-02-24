import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Bill } from '../model/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  JsonUrl: string = "http://localhost:3000/bill";

  list$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>([]);

  constructor( private http: HttpClient, private toastr: ToastrService ) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Bill[]>(this.JsonUrl).subscribe(
      products => this.list$.next(products)
    );
  }

  get( id: number | string ): Observable<Bill> {
    id = parseInt(('' + id), 10);
    return this.http.get<Bill>(`${this.JsonUrl}/${id}`);
  }

  update(bill: Bill): Observable<Bill> {
    return this.http.patch<Bill>(
     `${this.JsonUrl}/${bill.id}`,
     bill
    ).pipe(
      tap( () =>{
        this.getAll();
        this.toastr.info('The Bill has been uodated.', 'UPDATED');
      })
    );
  }

  create(bill: Bill): void {
    this.http.post<Bill>(
      `${this.JsonUrl}`,
      bill
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.success('The Bill has been created.', 'NEW EVENT');
  }

  remove(bill: Bill): void {
    this.http.delete<Bill>(
      `${this.JsonUrl}/${bill.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.warning('The Bill has been deleted.', 'DELETED');
  }

}
