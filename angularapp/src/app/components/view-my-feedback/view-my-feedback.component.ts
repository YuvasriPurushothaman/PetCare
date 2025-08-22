import { Component, OnInit } from '@angular/core';

import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-view-my-feedback',
  templateUrl: './view-my-feedback.component.html',
  styleUrls: ['./view-my-feedback.component.css']
})
export class ViewMyFeedbackComponent implements OnInit {
  feedbacks: any[];
  userId:number;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.userId = +localStorage.getItem('userId');
    this.getAllFeedbacks();
  }

  getAllFeedbacks(){
    this.feedbackService.getFeedbacksByUserId(this.userId).subscribe((data) => {
      this.feedbacks = data;
      console.log(this.feedbacks)
    }, (error) => {
      console.error("Errors occurs while fetching data", error);
    });
  }

  deleteFeedback(feedbackId) {
    this.feedbackService.deleteFeedback(feedbackId).subscribe();
    this.feedbackService.getFeedbacksByUserId(this.userId).subscribe((data) => {
      this.feedbacks = data;
      console.log(this.feedbacks)
      this.getAllFeedbacks()
    }, (error) => {
      console.error("Errors occurs while fetching data", error);
    });
  }

}
