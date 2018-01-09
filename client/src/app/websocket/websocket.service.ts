import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class WebsocketService {

  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  addCard(card) {
    this.socket.emit('create-card', card);
  }

  reloadCard(card) {
    console.log('socket reload');
    this.socket.emit('reload-card', card);
  }

  getCards() {
    const observable = new Observable(observer => {
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

