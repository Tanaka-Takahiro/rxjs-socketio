import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class WebsocketService {

  private url = 'http://localhost:3000';
  private socket;

  addCard(card) {
    this.socket.emit('create-card', card);
  }

  getCards() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('new-card', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}

