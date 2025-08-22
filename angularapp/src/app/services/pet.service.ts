import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  baseUrl:string = environment.backendUrl;
  user:User;
  private username=localStorage.getItem('username');

  constructor(private http: HttpClient) {
    this.getUserByUsername(this.username).subscribe((data)=>{
      this.user=data;
    })
   }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json"
    });
  }
  
  public addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(`${this.baseUrl}/api/pet/${this.user.userId}`, pet ,{headers:this.getHeaders()});
  }

  public getPetById(petId: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.baseUrl}/api/pet/${petId}`,{headers:this.getHeaders()});
  }

  public getAllPetsByUserId(userId): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.baseUrl}/api/pet/user/${userId}`,{headers:this.getHeaders()});
  }

  public updatePetById(petId: number, updatePet: Pet): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/${updatePet.userId}/pet/${petId}`, updatePet, { headers: this.getHeaders() });
  }

  public deletePetById(petId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/pet/${petId}`,{headers:this.getHeaders()});
  }

  public getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.baseUrl}/api/pet`,{headers:this.getHeaders()});
  }
  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/user/${username}`,{headers:this.getHeaders()});
  }
}
