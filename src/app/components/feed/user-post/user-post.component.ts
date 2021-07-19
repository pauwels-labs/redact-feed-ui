import { HttpParams } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/api/post.model';
import { AppConfigService } from 'src/app/services/appconfig.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {

  showEdit = false;
  queryParams: HttpParams;

  @Input() post!: Post;
  retrievalURL!: string;

  constructor(
    private appConfigService: AppConfigService
  ) {
    this.queryParams = new HttpParams()
      .set("css", "body{font-family: Public Sans; margin:0px;}iframe{border:none;height:86px;width:700;position:absolute;}");
  }

  ngOnInit(): void { 
    this.retrievalURL = this.generateRetrievalUrl();
  }

  /**
   * Get the Redact path of the data entry
   */
  public get postPath() {
    return this.post.contentReference;
  }

  /**
   * Retrieves the editable Redact entry
   */
  onEditClicked(){
    this.queryParams = this.queryParams.append('edit', 'true');
    this.queryParams = this.queryParams.append('data_type', 'String');
    this.queryParams = this.queryParams.append('js_message', btoa(`update=${this.post.contentReference}`));
    this.retrievalURL = this.generateRetrievalUrl();
  }

  /**
   * Retrieves the ineditable Redact entry
   */
  onSubmit() {
    this.queryParams = this.queryParams.delete('edit');
    this.queryParams = this.queryParams.delete('js_message');
    this.queryParams = this.queryParams.delete('data_type');
    this.retrievalURL = this.generateRetrievalUrl();
  }

  generateRetrievalUrl() {
    return `${this.appConfigService.clientHost}/data/${this.post.contentReference}?${this.queryParams.toString()}`;
  }

  /**
   * Called when the mouse moves over the component
   */
  over(){
    this.showEdit = true;
  }

  /**
   * Called when the mouse moves out of the component
   */
  out(){
    this.showEdit = false;
  }
}
