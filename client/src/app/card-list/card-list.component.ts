import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
  providers: [WebsocketService]
})
export class CardListComponent implements OnInit, OnDestroy {

  public connection;
  public cards = [];
  public card = {title: '', description: '', image: '', cardId: -1, loading: true};

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.connection = this.websocketService.getCards().subscribe(card => {
      console.log('Card received');
      console.log(card);
      this.cards[card.cardId] = card;
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  public addCard() {
    console.log('Add card');
    this.card.cardId = this.generateId();
    console.log(this.card);
    this.cards.push(this.card);
    this.websocketService.addCard(this.card);
    this.card = {title: '', description: '', image: '', cardId: -1, loading: true};
  }

  private generateId() {
    return this.cards.length;
  }
}
