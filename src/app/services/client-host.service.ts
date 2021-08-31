import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientHostService {

  constructor() { }

  getClientHost(): string {
    let clientPort = this.getClientPort();
    return `http://localhost:${clientPort}`;
  }

  getClientPort(): number {
    let clientPortString = localStorage.getItem('feed.client-port');
    if (clientPortString == null) {
      clientPortString = '8080';
    }
    return parseInt(clientPortString as string);
  }

  setClientPort(port: number){
    localStorage.setItem('feed.client-port', port.toString());
  }
}
