import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViewTreatmentRecord } from '../models/viewTreatmentRecord.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentRecordService {

  baseUrl:string = environment.backendUrl;
  
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json"
    });
  }
  // /api/user/{userId}/pet/{petId}/appointment/{appointmentId}
  public addRecord(record:ViewTreatmentRecord): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/user/${record.userId}/pet/${record.petId}/appointment/${record.appointmentId}`,record);
  }

  public getAllRecords(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/admin/records`);
  }

  public getRecordById(userId): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/user/records/${userId}`);
  }

}
