import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/api/post.model';
import { FeedService } from 'src/app/services/feed.service';
import { UserPostComponent } from '../user-post/user-post.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  pageSize = 10;
  skip = 0;
  posts: Post[];
  isLastPage = false;

  @ViewChildren('posts')
  postComponents!: QueryList<UserPostComponent>;

  constructor(private feedService: FeedService) { 
    this.posts = [];
  }

  ngOnInit(): void {
    this.getNextPage();
  }

  /**
   * Retrieve the next page of posts and append to the end of the list of posts
   */
  public getNextPage() {
    if (!this.isLastPage) {
      this.feedService.getPosts(this.skip, this.pageSize).subscribe(res => {
        for(var post of res) {
          this.posts.push(post);
        }

        if (res.length < this.pageSize) {
          this.isLastPage = true;
        }
      });
      this.skip += this.pageSize;
    }
  }

  /**
   * Retrieves the most recent post and appends it to the front of the post array
   */
  addLatestPost() {
    this.feedService.getPosts(0, 1).subscribe(res => {
      if (res.length > 0) {
        this.posts.unshift(res[0])
        this.skip += 1;
      }
    });
  }

  /**
   * Update the component which holds the Redacted data with the given path
   * @param path The path of Redacted data to be updated
   */
  updatePost(path: string) {
    for (var component of this.postComponents.toArray()) {
      if (component.postPath === path) {
        component.onSubmit();
      }
    }

  }
}
