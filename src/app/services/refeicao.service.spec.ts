import { TestBed } from '@angular/core/testing';

import { RefeicaoService } from './refeicao.service';

describe('RefeicaoService', () => {
  let service: RefeicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefeicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
