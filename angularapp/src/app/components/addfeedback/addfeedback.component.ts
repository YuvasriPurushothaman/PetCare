import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from '../../models/feedback.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.component.html',
  styleUrls: ['./addfeedback.component.css']
})
export class AddfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  
  inputRating: number = 0;

  userId:number=null
  appointmentId:number=null
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private formBuilder: FormBuilder, private feedbackService: FeedbackService, private routes:ActivatedRoute, private router:Router) {
    this.feedbackForm = this.formBuilder.group({
      message: ["", [Validators.required, Validators.minLength(10)]],
      rating: ["", Validators.required],
    })
    this.userId=+this.routes.snapshot.paramMap.get('userId')
    this.appointmentId=+this.routes.snapshot.paramMap.get('appointmentId')
  }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      message: ["", [Validators.required, Validators.minLength(10)]],
      rating: ["", Validators.required],
    })
  }
  addNewFeedback() {
    if (this.feedbackForm.valid) {
      let userFeedback: Feedback = {
        userId:this.userId,
        appointmentId:this.appointmentId,
        message:this.feedbackForm.get("message").value,
        rating:this.feedbackForm.get("rating").value,
      }
      console.log("input: ", userFeedback);
      this.feedbackService.addFeedback(userFeedback).subscribe((data) => {
        console.log(data);
        this.showToastMessage('Feedback added successfully!');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      (error) => {
        this.showToastMessage('Failed to add feedback');
        console.log(error);
      });
    } else {
      this.showToastMessage('Please fill out all required fields');
      console.log('Form is invalid');
    }
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
  
  get message() {
    return this.feedbackForm.get("message");
  }

  get rating() {
    return this.feedbackForm.get("rating");
  }

  setRating(value: number) {
    this.inputRating = value;
    this.feedbackForm.patchValue({ rating: value }); 
  }
}