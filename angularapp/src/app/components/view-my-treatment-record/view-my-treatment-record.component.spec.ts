import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyTreatmentRecordComponent } from './view-my-treatment-record.component';

describe('ViewMyTreatmentRecordComponent', () => {
  let component: ViewMyTreatmentRecordComponent;
  let fixture: ComponentFixture<ViewMyTreatmentRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyTreatmentRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyTreatmentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
