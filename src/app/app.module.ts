import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed/feed.component';
import { UserPostComponent } from './components/feed/user-post/user-post.component';
import { SafePipe } from './pipes/safe.pipe';
import { NewPostComponent } from './components/new-post/new-post.component';
import { HttpClientModule } from '@angular/common/http';
import { FeedService } from './services/feed.service';
import { AppConfigService } from './services/appconfig.service';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    UserPostComponent,
    SafePipe,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { 
      provide : APP_INITIALIZER, 
      multi : true, 
       deps : [AppConfigService], 
       useFactory : (appConfigService : AppConfigService) =>  () => appConfigService.loadAppConfig()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
