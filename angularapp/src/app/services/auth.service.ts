import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.backendUrl;
  
  private currentUserRole = new BehaviorSubject<string>(null);
  private currentUserId = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json"
    });
  }
  // Method to generate invitation code
  generateInvitationCode(): Observable<{ code: string }> {
    return this.http.post<{ code: string }>(`${this.baseUrl}/api/generate-invitation-code`, {},{ headers: this.getHeaders() });
  }

  // Method to validate invitation code
  validateInvitationCode(code: string): Observable<boolean> {
    return this.http.post<{ valid: boolean }>(`${this.baseUrl}/api/validate-invitation-code`, { code })
      .pipe(map(response => response.valid));
  }

  // Method to register a new user
  public register(userRegister: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/register`, userRegister);
  }

  // Method to login a user
  login(login: Login): Observable<any> {
    console.log("before token");
    return new Observable(observer => {
      this.http.post(`${this.baseUrl}/api/login`, login, { responseType: 'text' }).subscribe(
        (token) => {
          console.log("token", token);
          localStorage.setItem('token', token);
          const userDetail = this.decodeToken(token);
          console.log("userDetail", userDetail);
          this.currentUserRole.next(userDetail.userRole);
          observer.next(userDetail); // Notify observers with user details
          observer.complete();
        },
        error => {
          console.error("Login error", error); // Log the error for debugging
          observer.error(error);
        }
      );
    });
  }

  // Method to decode the JWT token
  private decodeToken(token: string): any {
    console.log(token, typeof token);
 
    // Split the token to get the payload part
    const payloadPart = token.split('.')[1];
 
    // Decode the Base64 encoded payload
    const payload = atob(payloadPart);
 
    // Parse the JSON payload
    const parsedPayload = JSON.parse(payload);
 
    console.log(parsedPayload);
 
    localStorage.setItem('username', parsedPayload.sub);
    localStorage.setItem('role', parsedPayload.role);
    localStorage.setItem('userId', parsedPayload.userId);
    
    return parsedPayload;
  }

  // Method to get the current user's role
  getCurrentUserRole(): Observable<string> {
    return this.currentUserRole.asObservable();
  }

  // Method to get the current user's ID
  getCurrentUserId(): Observable<number> {
    return this.currentUserId.asObservable();
  }

  // Method to get user details by username
  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/user/${username}`);
  }
}
