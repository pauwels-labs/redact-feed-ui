import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/api/jwt-token-response.model';
import { AppConfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class HostSessionService {

  jwtHelperService: JwtHelperService;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) { 
    this.jwtHelperService = new JwtHelperService();
  }

  getSessionToken(): Promise<string> {
    let isValid = false;
    let existingToken = localStorage.getItem('feed.redact.sessionAuthorizationToken');
    if (existingToken != null && this.jwtHelperService.getTokenExpirationDate(existingToken as string) != null) {
      isValid = (this.jwtHelperService.getTokenExpirationDate(existingToken as string) as Date) < new Date(Date.now());
      if (isValid) {
        return new Promise(resolve => resolve(existingToken as string));
      }
    }

    return new Promise(resolve => {
      this.http.post<JwtResponse>(
        `${this.appConfigService.clientHost}/proxy`,
        { 
          host_url: this.appConfigService.sessionCreateUrl
        }
      ).subscribe(
          (data: JwtResponse) => {
            localStorage.setItem('feed.redact.sessionAuthorizationToken', data.auth_token);
            resolve(data.auth_token);
       })
    });
  }
}
