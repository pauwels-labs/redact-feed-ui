import { Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientConnectDialogComponent } from './components/client-connect-dialog/client-connect-dialog.component';
import { FeedComponent } from './components/feed/feed/feed.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { ClientHostService } from './services/client-host.service';
import { ClientService } from './services/client.service';

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
  ) {}

  ngOnInit(): void {
    this.clientService.getHealth().subscribe(
      data => console.log('success', data),
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
