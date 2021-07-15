import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import {HttpParams} from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appconfig.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  public newPostSrc: string;

  constructor(
    private appConfigService: AppConfigService
  ) {
    this.newPostSrc = this.generatePostUrl();
  }

  ngOnInit(): void {
  }

  public refresh() {
    this.newPostSrc = this.generatePostUrl();
  }

  private generatePostUrl() {
    const newPostUuid = uuid.v4();
    let params = new HttpParams()
      .set("edit",true)
      .set("relay_url", this.appConfigService.relayUrl)
      .set("css", "input.text{height:40px;width:640px;}iframe{border:none;height:86px;width:700;position:absolute;}body{margin:0px;}")
    return `${this.appConfigService.clientHost}/data/.redact.redact-feed.post.${newPostUuid}.?${params.toString()}`;
  }
}
