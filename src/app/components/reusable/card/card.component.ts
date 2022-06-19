import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tax-buddy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() options: any;
  constructor() {}

  ngOnInit(): void {}
}
