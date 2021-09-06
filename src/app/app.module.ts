import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed/feed.component';
import { UserPostComponent } from './components/feed/user-post/user-post.component';
import { SafePipe } from './pipes/safe.pipe';
import { NewPostComponent } from './components/new-post/new-post.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './services/appconfig.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClientConnectDialogComponent } from './components/client-connect-dialog/client-connect-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { KeybaseUserSearchBarComponent } from './components/keybase-user-search-bar/keybase-user-search-bar.component';
import { KeybaseUserViewComponent } from './components/keybase-user-search-bar/keybase-user-view/keybase-user-view.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    UserPostComponent,
    SafePipe,
    NewPostComponent,
    ClientConnectDialogComponent,
    KeybaseUserSearchBarComponent,
    KeybaseUserViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatIconModule,
    FormsModule
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
