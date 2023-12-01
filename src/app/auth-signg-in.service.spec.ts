import { TestBed } from '@angular/core/testing';

import { AuthSigngInService } from './auth-signg-in.service';

describe('AuthSigngInService', () => {
  let service: AuthSigngInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSigngInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
