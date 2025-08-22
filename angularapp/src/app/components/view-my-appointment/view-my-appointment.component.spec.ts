import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyAppointmentComponent } from './view-my-appointment.component';

describe('ViewMyAppointmentComponent', () => {
  let component: ViewMyAppointmentComponent;
  let fixture: ComponentFixture<ViewMyAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
