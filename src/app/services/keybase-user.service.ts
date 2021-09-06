import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeybaseUserLookupResponse } from '../models/keybase/keybase-user-lookup-response.model';
import { KeybaseUserSearchResponse } from '../models/keybase/keybase-user-search-response.model';

@Injectable({
  providedIn: 'root'
})
export class KeybaseUserService {

  constructor(
    private http: HttpClient
  ) { }

  search(searchTerm: String): Observable<KeybaseUserSearchResponse> {
    return this.http.get<KeybaseUserSearchResponse>(`https://keybase.io/_/api/1.0/user/user_search.json?q=${searchTerm}&fields=profile,pictures&num_wanted=10`);
  }

  getByUid(uid: String): Observable<KeybaseUserLookupResponse> {
    return this.http.get<KeybaseUserLookupResponse>(`https://keybase.io/_/api/1.0/user/lookup.json?uid=${uid}`);
  }
}
