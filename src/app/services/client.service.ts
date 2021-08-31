import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ClientHostService } from './client-host.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private clientHostService: ClientHostService
  ) { }

  getHealth(): Observable<String> {
    return this.http.get<String>(`${this.clientHostService.getClientHost()}/healthz`);
  }
}
