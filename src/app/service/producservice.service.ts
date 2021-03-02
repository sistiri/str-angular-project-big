import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProducserviceService extends BaseService<Product>{


  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http, 'products');
   }


}
