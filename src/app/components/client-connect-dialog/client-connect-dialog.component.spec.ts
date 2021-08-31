import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConnectDialogComponent } from './client-connect-dialog.component';

describe('ClientConnectDialogComponent', () => {
  let component: ClientConnectDialogComponent;
  let fixture: ComponentFixture<ClientConnectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientConnectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientConnectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
