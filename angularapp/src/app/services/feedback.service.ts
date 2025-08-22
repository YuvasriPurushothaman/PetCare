import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  baseUrl:string = environment.backendUrl;
  
  constructor(private http:HttpClient) { }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json"
    });
  }
  public getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.baseUrl+"/api/feedback");
  }
  public addFeedback(feedback:Feedback):Observable<Feedback>{
    return this.http.post<Feedback>(this.baseUrl+"/api/feedback/"+feedback.userId+"/"+feedback.appointmentId,feedback);
  }
  public getFeedbacksByUserId(userId:number):Observable<Feedback[]>{
  return this.http.get<Feedback[]>(this.baseUrl+"/api/feedback/user/"+userId,{ headers: this.getHeaders() });
  }
  public deleteFeedback(feedbackId:number):Observable<void>{
  return this.http.delete<void>(this.baseUrl+"/api/feedback/"+feedbackId);
  }
  
}
