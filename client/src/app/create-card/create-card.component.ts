import {Component, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
  public card = {title: '', description: '', image: '', cardId: -1, status: "Creating"};
  @Output() onSave: EventEmitter<any>;
  constructor() {
    this.onSave = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  public triggerSave() {
    this.onSave.emit(this.card);
    this.card = {title: '', description: '', image: '', cardId: -1, status: "Creating"};
  }

}
