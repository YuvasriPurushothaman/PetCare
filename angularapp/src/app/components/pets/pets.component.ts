import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/services/appointment.service';
import { forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
 
@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css'],
  providers: [NgbPaginationConfig]
})
export class PetsComponent implements OnInit {
 
  petForm: FormGroup;
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  pet: Pet;
  userId: number;
  showToast: boolean = false;
  toastMessage: string = '';
  page = 1;
  pageSize = 6;
  searchQuery = '';
 
  constructor(
    private formBuilder: FormBuilder,
    private petService: PetService,
    private router: Router,
    private appointmentService: AppointmentService,
    config: NgbPaginationConfig
  ) {
    this.petForm = this.formBuilder.group({
      species: ["", Validators.required],
      breed: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      userId: ["", Validators.required],
      status: ["", Validators.required]
    });
 
    config.size = 'sm';
    config.boundaryLinks = true;
  }
 
  ngOnInit(): void {
    this.userId = +localStorage.getItem("userId");
    this.getAllPetsByUserId();
  }
 
  getAllPetsByUserId() {
    forkJoin({
      pets: this.petService.getAllPetsByUserId(this.userId),
      appointments: this.appointmentService.getAllAppointments()
    }).pipe(
      map(({ pets, appointments }) => {
        return pets.map(pet => {
          pet.hasAppointment = appointments.some(appointment => appointment.pet.petId === pet.petId);
          return pet;
        }).sort((a, b) => a.name.localeCompare(b.name));
      }),
      catchError(error => {
        console.error('Error fetching pets or appointments', error);
        return [];
      })
    ).subscribe(data => {
      this.pets = data;
      this.filteredPets = [...data];
      console.log(this.filteredPets);
    });
  }
 
  searchPets() {
    if (this.searchQuery.trim() === '') {
      this.filteredPets = [...this.pets];
    } else {
      this.filteredPets = this.pets.filter(pet =>
        pet.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        pet.species.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
 
  deletePetById(petId) {
    this.petService.deletePetById(petId).subscribe(() => {
      this.showToastMessage('Pet deleted successfully!');
      this.getAllPetsByUserId();
    },
      (error) => {
        this.showToastMessage('Failed to delete pet');
        console.log("Error deleting pet", error);
      });
  }
 
  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}