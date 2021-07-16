import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Post } from '../models/api/post.model';
import { AppConfigService } from './appconfig.service';
import { HostSessionService } from './host-session.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService,
    private hostSessionService: HostSessionService
  ) { }

  getPosts(skip: number, limit: number): Observable<Post[]> {
    return from(this.hostSessionService.getSessionToken())
    .pipe(
      mergeMap((jwt: string) => {
        let headers = new HttpHeaders()
          .set('Authorization', `Bearer ${jwt}`);
        return this.http.get<Post[]>(`${this.appConfigService.apiHost}/feed?skip=${skip}&limit=${limit}`, {headers});
      }))
  }
}
