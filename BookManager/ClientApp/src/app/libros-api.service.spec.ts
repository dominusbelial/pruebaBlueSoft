import { TestBed } from '@angular/core/testing';

import { LibrosApiService } from './libros-api.service';

describe('LibrosApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibrosApiService = TestBed.get(LibrosApiService);
    expect(service).toBeTruthy();
  });
});
