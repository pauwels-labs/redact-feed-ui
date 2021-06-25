import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/api/post.model';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: Post[];

  constructor(private feedService: FeedService) { 
    this.posts = [];
  }

  ngOnInit(): void {
    this.refreshFeed();
  }

  public refreshFeed() {
    this.feedService.getPosts().subscribe(res => {
      this.posts = [];

      for(var post of res) {
        this.posts.push(post);
      }
    });
  }

}
