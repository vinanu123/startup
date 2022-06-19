import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Page } from '../entity/Page';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}

  addCart(stateData: Page): void {
    // console.log(data);

    this.store.dispatch({
      type: 'ADD_COIN',
      payload: <Page>stateData,
    });
  }

  updateStore(stateData: Page): void {
    // console.log(data);

    this.store.dispatch({
      type: 'UPDATE_STORE',
      payload: <Page>stateData,
    });
  }
  // UPDATE_COMPILED_DATA;
  updateCompiledTaxData(compiledData: any): void {
    // console.log(data);

    this.store.dispatch({
      type: 'UPDATE_COMPILED_DATA',
      payload: <any>compiledData,
    });
  }
}
