import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeybaseUserSearchBarComponent } from './keybase-user-search-bar.component';

describe('KeybaseUserSearchBarComponent', () => {
  let component: KeybaseUserSearchBarComponent;
  let fixture: ComponentFixture<KeybaseUserSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeybaseUserSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeybaseUserSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
