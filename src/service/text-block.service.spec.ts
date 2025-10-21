import { TestBed } from '@angular/core/testing';

import { TextBlockService } from './text-block.service';

describe('TextBlockService', () => {
  let service: TextBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
