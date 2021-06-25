import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/api/post.model';
import { AppConfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.appConfigService.apiHost}/feed/abc`);
  }
}
