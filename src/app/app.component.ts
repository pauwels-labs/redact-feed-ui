import { Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ClientConnectDialogComponent } from './components/client-connect-dialog/client-connect-dialog.component';
import { FeedComponent } from './components/feed/feed/feed.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { KeybaseUser, KeybaseUserLookupResponse } from './models/keybase/keybase-user-lookup-response.model';
import { KeybaseSearchResult, KeybaseUserSearchResponse, keybaseUserSummary } from './models/keybase/keybase-user-search-response.model';
import { ClientHostService } from './services/client-host.service';
import { ClientService } from './services/client.service';
import { KeybaseUserService } from './services/keybase-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  @ViewChild(FeedComponent)
  public feedComponent!: FeedComponent;

  @ViewChild(NewPostComponent)
  public newPostComponent!: NewPostComponent;

  title = 'redact-feed';

  constructor(
    public dialog: MatDialog,
    private clientService: ClientService
  ) { }


  ngOnInit(): void {
    this.clientService.getHealth().subscribe(
      _resp => {},
      _error => {
        let dialogRef = this.dialog.open(ClientConnectDialogComponent, {
          data: {},
          panelClass: 'client-connect-dialog'
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            window.location.reload();
          }
        });
      }
    );
  }

  @HostListener('window:message', ['$event'])
  PostSubmittedEvent(event: MessageEvent) {
    if (typeof(event.data) === 'string') {
      let message = atob(event.data as string);

      if (message.startsWith("create")) {
        this.feedComponent.addLatestPost();
        this.newPostComponent.refresh(message);
      } else if (message.startsWith("update=")) {
        let path = message.substring('update='.length);
        this.feedComponent.updatePost(path);
      } else if (message.startsWith("height=")) {
        let pathAndHeight = message.substring('height='.length);
        let paramArr = pathAndHeight.split(":", 2);
        this.feedComponent.updateHeight(paramArr[0], paramArr[1]);
      }
    }
  }
}
