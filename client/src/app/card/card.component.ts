import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card;
  @Output() onReload: EventEmitter<any>;
  constructor() {
    this.onReload = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  public triggerReload() {
    console.log("trigger reload");
    this.onReload.emit(this.card.cardId);
  }

}
