import { HttpParams } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/api/post.model';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {

  @HostListener('window:message', ['$event'])
  PostSubmittedEvent(event: MessageEvent) {
    if(event.data === "data created") {
      this.queryParams.delete('create');
      this.queryParams.delete('data_type');
      this.retrievalURL = this.generateRetrievalUrl();
    }
  }

  showEdit = false;
  queryParams: HttpParams;

  @Input() post!: Post;
  retrievalURL!: string;

  constructor() {
    this.queryParams = new HttpParams()
      .set("css", "body{font-family: Public Sans; margin:0px;}iframe{border:none;height:86px;width:700;position:absolute;}");
  }

  ngOnInit(): void { 
    this.retrievalURL = this.generateRetrievalUrl();
  }

  onEditClicked(){
    this.queryParams = this.queryParams.append('edit', 'true');
    this.queryParams = this.queryParams.append('data_type', 'String');
    this.retrievalURL = this.generateRetrievalUrl();
  }

  generateRetrievalUrl() {
    return `http://localhost:8080/data/${this.post.contentReference}?${this.queryParams.toString()}`;
  }

  over(){
    this.showEdit = true;
  }

  out(){
    this.showEdit = false;
  }

  

}
