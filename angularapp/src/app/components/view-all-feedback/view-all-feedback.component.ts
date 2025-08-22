import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-view-all-feedback',
  templateUrl: './view-all-feedback.component.html',
  styleUrls: ['./view-all-feedback.component.css']
})
export class ViewAllFeedbackComponent implements OnInit {
 feedbacks:Feedback[]=[];

  constructor(private feedbackService:FeedbackService)  { }

  ngOnInit(): void {
    this.getFeedbacks();
  }
  getFeedbacks(){
    this.feedbackService.getFeedbacks().subscribe((data)=>{
      this.feedbacks=data;
      console.log(this.feedbacks);
    },(error)=>{
      console.error("Error while fetching data",error);
    })
  }
  deleteFeedback(id){
    this.feedbackService.deleteFeedback(id).subscribe(()=>{
      this.getFeedbacks();

    },(error)=>{
      console.error("Error occurs while deleting feedback",error);
    });
  }
}
