import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Page } from 'src/app/entity/Page';

@Component({
  selector: 'tax-buddy-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() options: any;
  storeData: Observable<Page[]> | undefined;
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();
  Show: boolean = false;
  constructor(public store: Store<AppState>) {}
  ngOnInit(): void {
    this.store
      .select((state) => state)
      .subscribe((res: any) => {
        this.storeData = res;
        this.options.SelectedItem = res?.taxStore?.selectedItem;
      });
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (this.options.SelectedItem) {
      this.options.isValueField = true;
      this.optionSelected.emit(this.options.SelectedItem);
    }
  }
  toggle() {
    this.Show = !this.Show;
  }
  select(item: any) {
    this.options.SelectedItem = item;
    this.options.isValueField = true;
    this.optionSelected.emit(item);
    this.toggle();
  }
}
