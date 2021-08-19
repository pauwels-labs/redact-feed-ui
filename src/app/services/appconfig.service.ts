import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;
  private http : HttpClient;
  
  constructor(http: HttpClient) {
	  this.http = http;
  }

  loadAppConfig() {
    return this.http.get('/assets/config/app-config.json')
      .toPromise()
      .then(config => {
        this.appConfig = config;
      });
  }

  get relayUrl() : string {
    return this.appConfig.relayUrl;
  }

  get apiHost() : string {
    return this.appConfig.apiHost;
  }

  get sessionCreateUrl() : string {
    return this.appConfig.sessionCreateUrl;
  }
}
