import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTreatmentRecordComponent } from './view-treatment-record.component';

describe('ViewTreatmentRecordComponent', () => {
  let component: ViewTreatmentRecordComponent;
  let fixture: ComponentFixture<ViewTreatmentRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTreatmentRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTreatmentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
