import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Page } from '../entity/Page';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  public dataObject: any = {};
  constructor(private store: Store<AppState>, private http: HttpClient) {}
  createCompiledData(data: any, oldCompiledData: any) {
    console.log(this.dataObject);
    // this.store
    //   .select((state) => state)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //   });
    return new Promise((resolve, reject) => {
      // console.log(data);
      data?.map((res: any) => {
        this.createObject(res?.tax_data);
      });

      console.log(this.dataObject);
      resolve(this.dataObject);
    });
  }
  createObject(data: any) {
    // console.log(data);
    data?.items?.map((res: any) => {
      // dataObject?.push({
      // })
      if (this.dataObject[res?.category] !== undefined) {
        // let appendData = this.dataObject;
        console.log('repreated', this.dataObject);
        Object.assign(this.dataObject[res?.category], {
          ...this.dataObject[res?.category],

          [res?.name]: {
            value: res?.actualValue,
            excemptionValue: res?.excemptionValue,
          },
        });
      } else {
        Object.assign(this.dataObject, {
          [res?.category]: {
            [res?.name]: {
              value: res?.actualValue,
              excemptionValue: res?.excemptionValue,
            },
          },
        });
      }
    });
  }
}
