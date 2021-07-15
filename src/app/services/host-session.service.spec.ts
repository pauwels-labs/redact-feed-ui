import { TestBed } from '@angular/core/testing';

import { HostSessionService } from './host-session.service';

describe('HostSessionService', () => {
  let service: HostSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
