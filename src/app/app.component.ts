import { AfterViewInit, Component, ContentChild, HostListener, OnInit, ViewChild} from '@angular/core';
import { FeedComponent } from './components/feed/feed/feed.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { HostSessionService } from './services/host-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  
  @ViewChild(FeedComponent)
  public feedComponent!: FeedComponent;

  @ViewChild(NewPostComponent)
  public newPostComponent!: NewPostComponent;

  title = 'redact-feed';
  sessionToken = localStorage.getItem('feed.redact.sessionAuthorizationToken');
  
  constructor(private hostSessionService: HostSessionService) {}

  ngOnInit(): void {
    if (this.sessionToken == null) {
      this.hostSessionService.getSessionToken().then(result => {
        this.sessionToken = result;
      });
    }
  }

  ngAfterViewInit(): void {
  }

  @HostListener('window:message', ['$event'])
  PostSubmittedEvent(event: MessageEvent) {
    if(event.data === "data created") {
      console.log(event.target)
      this.feedComponent.refreshFeed();
      this.newPostComponent.refresh();
    }

  }

}
