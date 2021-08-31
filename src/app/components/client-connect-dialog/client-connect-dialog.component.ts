import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientHostService } from 'src/app/services/client-host.service';

@Component({
  selector: 'app-client-connect-dialog',
  templateUrl: './client-connect-dialog.component.html',
  styleUrls: ['./client-connect-dialog.component.scss']
})
export class ClientConnectDialogComponent implements OnInit {

  whyExpandableShow = false;
  troubleExpandableShow = false;

  constructor(
    public dialogRef: MatDialogRef<ClientConnectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientHostService: ClientHostService
  ) { }

  ngOnInit(): void {
  }

  get clientPort(): number {
    return this.clientHostService.getClientPort();
  }

  onUpdate(port: string) {
    this.clientHostService.setClientPort(parseInt(port));
    this.dialogRef.close(true);
  }

  whyClicked() {
    this.whyExpandableShow = !this.whyExpandableShow;
  }

  troubleClicked() {
    this.troubleExpandableShow = !this.troubleExpandableShow;
  }

}
