import { TestBed } from '@angular/core/testing';

import { TreatmentRecordService } from './treatment-record.service';

describe('TreatmentRecordService', () => {
  let service: TreatmentRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
