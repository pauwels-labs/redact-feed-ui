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
    if (typeof(event.data) === 'string') {
      let message = atob(event.data as string);
      if (message === "create") {
        this.feedComponent.addLatestPost();
        this.newPostComponent.refresh();
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
