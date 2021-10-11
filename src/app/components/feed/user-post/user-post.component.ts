import { HttpParams } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/api/post.model';
import { ClientHostService } from 'src/app/services/client-host.service';

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

  height = 22;

  constructor(
    private clientHostService: ClientHostService
  ) {
    this.queryParams = new HttpParams()
      .set("css", "p, body, iframe {margin: 0px;padding: 0px;border: none;width: 100%;display: block;font-size: 18px;}iframe {height: 100%;}img {max-width:800px;}video {width:100%;max-width:800px;}");
  }

  ngOnInit(): void {
    this.queryParams = this.queryParams.append("js_height_msg_prefix", btoa(`height=${this.post.contentReference}:`));
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

  /**
   * Retrieves the ineditable Redact entry
   */
  onHeightUpdate(height: number) {
    if (height !== 0) {
      this.height = height;
    }
  }

  generateRetrievalUrl() {
    return `${this.clientHostService.getClientHost()}/unsecure/data/${this.post.contentReference}?${this.queryParams.toString()}`;
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
