import { TestBed } from '@angular/core/testing';

import { StateProviderService } from './state-provider.service';

describe('StateProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateProviderService = TestBed.get(StateProviderService);
    expect(service).toBeTruthy();
  });
});
