import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeybaseUserViewComponent } from './keybase-user-view.component';

describe('KeybaseUserViewComponent', () => {
  let component: KeybaseUserViewComponent;
  let fixture: ComponentFixture<KeybaseUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeybaseUserViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeybaseUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
