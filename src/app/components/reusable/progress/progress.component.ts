import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tax-buddy-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  @Input() options: any = {};
  @Output() editEmitter = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  editDataValue(data: any): void {
    this.editEmitter.emit(data);
  }
}
