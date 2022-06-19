import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tax-buddy-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Output() submitEventEmit = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  submitEvent() {
    this.submitEventEmit.emit(true);
  }
}
