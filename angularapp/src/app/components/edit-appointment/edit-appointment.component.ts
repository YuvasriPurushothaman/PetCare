import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent {

  appointmentId: number;
  appointment: Appointment;

  editAppointmentForm: FormGroup;

  constructor(private route: ActivatedRoute, private appointmentService: AppointmentService, private formBuilder: FormBuilder, private petService: PetService, private router: Router) {

    this.editAppointmentForm = this.formBuilder.group({
      appointmentDate: ["", Validators.required],
      reason: ["", Validators.required]
    });

  }

  ngOnInit(): void {
    this.appointmentId = +this.route.snapshot.paramMap.get('id');
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe((data) => {
      console.log(data);
      this.appointment = data
      const formattedDate = this.formatDate(data.appointmentDate);
      this.editAppointmentForm.patchValue({
        appointmentDate: formattedDate,
        reason: data.reason,
        status: data.status
      });
    });
  }

  update() {
    if (this.editAppointmentForm.valid) {
      this.appointment.appointmentDate = this.editAppointmentForm.value.appointmentDate
      this.appointment.reason = this.editAppointmentForm.value.reason
      console.log(this.appointment);
      this.appointmentService.updateAppointment(this.appointmentId, this.appointment).subscribe((data) => {
        console.log("Updated data", data);
        this.router.navigate(["/user/appointment/view-appointment"]);
      });
    }
  }


  cancelUpdate() {
    this.router.navigate(["/user/appointment/view-appointment"]);
  }
  get f() {
    return this.editAppointmentForm.controls;
  }

  pastDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return { pastDate: true };
    }
    return null;
  }
  formatDate(date: string): string {
    return date.split('T')[0];
  }
  getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}