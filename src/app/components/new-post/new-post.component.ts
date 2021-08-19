import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import {HttpParams} from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appconfig.service';
import { ClientHostService } from 'src/app/services/client-host.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  public newPostSrc: string;
  public newImgPostSrc: string;

  constructor(
    private appConfigService: AppConfigService,
    private clientHostService: ClientHostService
  ) {
    this.newPostSrc = this.generatePostUrl();
    this.newImgPostSrc = this.generateImgPostUrl();
  }

  ngOnInit(): void {
  }

  public refresh(message: String) {
    if (message === "create:text") {
      this.newPostSrc = this.generatePostUrl();
    } else if (message === "create:media") {
      this.newImgPostSrc = this.generateImgPostUrl();
    }
  }

  /**
   * Generate a random ID which will be used in the Redact path of the new post
   * @returns the Redact URL of a non-existent post
   */
  private generatePostUrl() {
    const newPostUuid = uuid.v4();
    let params = new HttpParams()
      .set("edit",true)
      .set("relay_url", this.appConfigService.relayUrl)
      .set("js_message", btoa("create:text"))
      .set("css", `
          input.text{ 
            height:40px;
            width:640px;
          }
          iframe{
            border:none;
            height:44px;
            width:780;
            position:absolute;
          }
          body{
            margin:0px;
            height:40px;
            overflow:hidden;
          }
          #submit{
            background: none;
          }
        `.replace(/(\r\n|\n|\r)/gm, ""))
    return `${this.clientHostService.getClientHost()}/data/.redact.redact-feed.post.${newPostUuid}.?${params.toString()}`;
  }

  /**
   * Generate a random ID which will be used in the Redact path of the new post
   * @returns the Redact URL of a non-existent post
   */
   private generateImgPostUrl() {
    const newPostUuid = uuid.v4();
    let params = new HttpParams()
      .set("edit",true)
      .set("relay_url", this.appConfigService.relayUrl)
      .set("js_message", btoa("create:media"))
      .set("css", `
        input.text{
          height:40px;
          width:740px;
        }
        iframe{
          border:none;
          height:44px;
          width:780;
          position:absolute;
        }
        body{
          margin:0px;
          height:40px;
          overflow:hidden;
        }`.replace(/(\r\n|\n|\r)/gm, ""))
      .set("data_type", "Media")
    return `${this.clientHostService.getClientHost()}/data/.redact.redact-feed.post.${newPostUuid}.?${params.toString()}`;
  }
}
