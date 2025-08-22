import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl:string = environment.backendUrl;
  user:User;
  private username=localStorage.getItem('username');

  constructor(private http:HttpClient) { 
    this.getUserByUsername(this.username).subscribe((data)=>{
      this.user=data;
    })
  }
  private headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  })
  public addAppointment(appointment:Appointment):Observable<Appointment>{
  return this.http.post<Appointment>(`${this.baseUrl}/api/appointments/${appointment.userId}/${appointment.petId}`,appointment,{headers:this.headers});
  }
  public getAllAppointments():Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/api/appointments`,{headers:this.headers});
  }
  public getAppointmentById(appointmentId):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/appointments/${appointmentId}`,{headers:this.headers})
  }
  public updateAppointment(id,updateAppointment):Observable<Appointment>{
    return this.http.put<Appointment>(`${this.baseUrl}/api/appointments/${id}`,updateAppointment,{headers:this.headers});

  }
  public deleteAppointment(id):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/api/appointments/${id}`,{headers:this.headers})
  }
  public getAppointmentByUserId(userId):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.baseUrl}/api/appointments/user/${userId}`,{headers:this.headers})
  }
  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/user/${username}`,{headers:this.headers});
  }

}
