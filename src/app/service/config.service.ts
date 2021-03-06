import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = 'https://es-csapat-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor() { }
}
