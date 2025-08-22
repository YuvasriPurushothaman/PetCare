import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyFeedbackComponent } from './view-my-feedback.component';

describe('ViewMyFeedbackComponent', () => {
  let component: ViewMyFeedbackComponent;
  let fixture: ComponentFixture<ViewMyFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
