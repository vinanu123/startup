import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
// import { EDIT_DATA } from 'src/app/tax-state-store/tax.actions';

@Component({
  selector: 'tax-buddy-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() options: any;
  @Output() inputValueEmitter = new EventEmitter();
  value: any;
  typeOfPage: any = 0;
  constructor(public store: Store<AppState>) {}

  ngOnInit(): void {
    this.value = this.options?.actualValue;
    this.store
      .select((state) => state)
      .subscribe((res: any) => {
        this.typeOfPage = res?.taxStore?.pageActive || 0;
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.value = this.options?.actualValue;
  }
  CommaFormatted(event: any) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) return;

    // format number
    if (this.value) {
      this.value = this.value;
      // .replace(/\D/g, '')
      // .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    this.options.actualValue = Number(this.value);
  }

  numberCheck(args: any) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  /**
   * add value
   */
  addValue(): void {
    this.options.actualValue = Number(this.value);
    this.options.percentage =
      (this.options.actualValue * 100) / this.options.excemptionValue;
    this.inputValueEmitter.emit(this.options);
    this.value = null;
  }
}
