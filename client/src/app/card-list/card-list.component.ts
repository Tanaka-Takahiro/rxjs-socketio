import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { Card } from '../models/card'

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
  providers: [WebsocketService]
})
export class CardListComponent implements OnInit, OnDestroy {

  public connection;
  public cards = [];

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.connection = this.websocketService.getCards().subscribe((card: Card) => {
      console.log('Card received');
      console.log(card);
      if (card.status === 'Creating') {
        this.cards.push(card);
      }
      else if (card.status === 'Created') {
        this.cards[card.cardId].status = card.status;
      }
      else if (card.status === 'Reloading') {
        this.cards[card.cardId].status = card.status;
      }
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  public addCard(card) {
    console.log('Add card');
    card.cardId = this.generateId();
    console.log(card);
    this.websocketService.addCard(card);
  }
  public reloadCard(cardId) {
    console.log('reload card');
    this.websocketService.reloadCard({cardId: cardId, status: 'Reloading'});
  }

  private generateId() {
    return this.cards.length;
  }
}
