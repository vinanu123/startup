import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor(public http: HttpClient) {}
  calculateTax(data: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://localhost:3001/api/tax/calculate', data?.data)
        .subscribe((res: any) => {
          resolve(res);
        });
    });
  }
}
