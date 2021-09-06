import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeybaseProof, KeybaseUser } from 'src/app/models/keybase/keybase-user-lookup-response.model';
import { KeybaseSearchResult } from 'src/app/models/keybase/keybase-user-search-response.model';
import { KeybaseUserService } from 'src/app/services/keybase-user.service';

@Component({
  selector: 'app-keybase-user-view',
  templateUrl: './keybase-user-view.component.html',
  styleUrls: ['./keybase-user-view.component.scss']
})
export class KeybaseUserViewComponent implements OnInit {

  error = false;
  user: KeybaseUser | null = null;

  username: String | null = null;
  pictureUrl: String = "assets/images/default-profile-pic.png";
  fullName: String | null = null;
  proofs: KeybaseProof[] | null = null;

  constructor(
    public dialogRef: MatDialogRef<KeybaseUserViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: KeybaseSearchResult},
    private keybaseUserService: KeybaseUserService,
  ) { }

  ngOnInit(): void {
    this.keybaseUserService.getByUid(this.data.user.keybase.uid).subscribe(
      resp => {
        if (resp.them == null) {
          this.error = true;
        } else {
          this.user = resp.them;
          this.username = this.user.basics.username;
          this.fullName = this.user.profile.full_name;
          this.pictureUrl = this.user.pictures.primary.url;
          this.proofs = this.user.proofs_summary.all;
        }
      }
    )
  }
}
