import { TestBed } from '@angular/core/testing';

import { AutoresApiService } from './autores-api.service';

describe('AutoresApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoresApiService = TestBed.get(AutoresApiService);
    expect(service).toBeTruthy();
  });
});
