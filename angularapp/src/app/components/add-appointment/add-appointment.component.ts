import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PetService } from 'src/app/services/pet.service';
import { User } from 'src/app/models/user.model';
import { Pet } from 'src/app/models/pet.model';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  username: string = undefined;
  pets: Pet[] = [];
  appointmentForm: FormGroup;
  user: User;
  petId: number;

  showToast: boolean = false;
  toastMessage: string = '';
  minDate: string;

  constructor(private appointmentService: AppointmentService, private formBuilder: FormBuilder, private petService: PetService, private router: Router) {
    this.appointmentForm = this.formBuilder.group({
      petName: ["", Validators.required],
      appointmentDate: ["", Validators.required],
      reason: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    console.error(this.username);
    this.minDate = new Date().toISOString().split('T')[0]; // Set minDate to today's date

    this.appointmentService.getUserByUsername(this.username).subscribe((data) => {
      this.user = data;
      console.log("data ", this.user);

      this.petService.getAllPetsByUserId(this.user.userId).subscribe((data) => {
        this.pets = data;
        console.log(data);
      });
    },
    (error) => {
      console.log(error);
    });
  }

  addNewAppointment() {
    if (this.appointmentForm.valid) {
      let appointment = {
        petId: this.petId,
        appointmentDate: this.appointmentForm.value.appointmentDate,
        reason: this.appointmentForm.value.reason,
        userId: this.user.userId,
        status: "pending"
      };

      console.log(appointment);
      this.appointmentService.addAppointment(appointment).subscribe((data) => {
        console.log(data);
        this.showToastMessage('Appointment added successfully!');
        setTimeout(() => {
          this.router.navigate(['/user/appointment/view-appointment']);
        }, 2000); 
      },
      (error) => {
        this.showToastMessage('Failed to add appointment');
        console.log("Error adding appointment", error);
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


  formatDate(dateString) {
    return dateString.split('T')[0];
  }

  get f() {
    return this.appointmentForm.controls;
  }

  getPet(id) {
    this.petId = id;
    console.log(id);
    console.log(this.petId);
  }
}
