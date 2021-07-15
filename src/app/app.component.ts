import { Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { FeedComponent } from './components/feed/feed/feed.component';
import { NewPostComponent } from './components/new-post/new-post.component';

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

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:message', ['$event'])
  PostSubmittedEvent(event: MessageEvent) {
    if(event.data === "data created") {
      console.log(event.target)
      this.feedComponent.refreshFeed();
      this.newPostComponent.refresh();
    }

  }

}
