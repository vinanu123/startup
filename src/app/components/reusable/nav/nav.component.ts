import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'tax-buddy-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Input() data: any = {};
  @Output() backEmmiter = new EventEmitter();
  typeOfPage: number = 0;
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select((state) => state)
      .subscribe((res: any) => {
        this.typeOfPage = res?.taxStore?.pageActive;
      });
  }
  goBack(): void {
    this.backEmmiter.emit(this.typeOfPage);
  }
}
