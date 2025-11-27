import { TestBed } from '@angular/core/testing';

import { NutrienteService } from './nutriente.service';

describe('NutrienteService', () => {
  let service: NutrienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutrienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
