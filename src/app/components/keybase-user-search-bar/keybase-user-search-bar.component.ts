import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { KeybaseSearchResult, KeybaseUserSearchResponse } from 'src/app/models/keybase/keybase-user-search-response.model';
import { KeybaseUserService } from 'src/app/services/keybase-user.service';
import { KeybaseUserViewComponent } from './keybase-user-view/keybase-user-view.component';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-keybase-user-search-bar',
  templateUrl: './keybase-user-search-bar.component.html',
  styleUrls: ['./keybase-user-search-bar.component.scss']
})
export class KeybaseUserSearchBarComponent implements OnInit {

  keybaseSearchResponse: KeybaseUserSearchResponse | null;
  userSearchInput$ = new Subject<EventTarget | null>();
  userSearchInputValue: String | null;
  showSearchResults = false;

  constructor(
    private keybaseUserService: KeybaseUserService,
    private _eref: ElementRef,
    public dialog: MatDialog,
  ) { 
    this.userSearchInputValue = null;
    this.keybaseSearchResponse = null;
    this.userSearchInput$
      .pipe(debounceTime(300))
      .subscribe(searchEventTarget => {
        if (searchEventTarget != null) {
          this.userSearchInputValue = (searchEventTarget as HTMLInputElement).value;
          this.keybaseUserService.search(this.userSearchInputValue).subscribe(result => {
            if (result) {
              this.keybaseSearchResponse = result;
            }
          });
        }
      });

      this.userSearchInput$
      .subscribe(_ => {
        this.keybaseSearchResponse = null;
      });
  }

  ngOnInit(): void {
  }

  onClick(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showSearchResults = false;
    }
  }

  get keybaseUserResults(): KeybaseSearchResult[] {
    if (this.keybaseSearchResponse != null && this.keybaseSearchResponse.list != null) {
      return this.keybaseSearchResponse.list;
    } else {
      return [];
    }
  }

  getProfilePictureSrc(user: KeybaseSearchResult) {
    if (user.keybase.picture_url == null || user.keybase.picture_url == "") {
      return "assets/images/default-profile-pic.png";
    } else {
      return user.keybase.picture_url;
    }
  }


  startUserSearch() {
    this.showSearchResults = true;
  }

  onFocus() {
    if (this.userSearchInputValue != null && this.userSearchInputValue != "") {
      this.showSearchResults = true;
    }
  }

  clickUser(user: KeybaseSearchResult) {
    this.showSearchResults = false;

    let dialogRef = this.dialog.open(KeybaseUserViewComponent, {
      data: { user },
      panelClass: 'keybase-user-dialog'
    });
  }
}
