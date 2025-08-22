import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { PetService } from 'src/app/services/pet.service';
import { forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-my-appointment',
  templateUrl: './view-my-appointment.component.html',
  styleUrls: ['./view-my-appointment.component.css'],
  providers: [NgbPaginationConfig]
})
export class ViewMyAppointmentComponent implements OnInit {

  appointments: any[] = [];
  filteredAppointments: any[] = [];
  userId: number;
  page = 1;
  pageSize = 6;
  searchQuery = '';
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(
    private appointmentService: AppointmentService,
    private petService: PetService,
    private router: Router,
    private feedbackService: FeedbackService,
    config: NgbPaginationConfig
  ) {
    config.size = 'sm';
    config.boundaryLinks = true;
  }

  ngOnInit(): void {
    this.userId = +localStorage.getItem('userId');
    this.getAllAppointments();
  }

  getAllAppointments() {
    forkJoin({
      appointments: this.appointmentService.getAppointmentByUserId(this.userId),
      feedbacks: this.feedbackService.getFeedbacks()
    }).pipe(
      map(({ appointments, feedbacks }) => {
        return appointments.map(appointment => {
          appointment.hasFeedback = feedbacks.some(feedback => feedback.appointment.appointmentId === appointment.appointmentId);
          return appointment;
        }).sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());
      }),
      catchError(error => {
        console.error('Error fetching appointments or feedbacks', error);
        return [];
      })
    ).subscribe(data => {
      this.appointments = data;
      this.filteredAppointments = [...data];
    });
  }

  searchAppointments() {
    if (this.searchQuery.trim() === '') {
      this.filteredAppointments = [...this.appointments];
    } else {
      this.filteredAppointments = this.appointments.filter(appointment =>
        appointment.pet.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  addFeedback(appointmentId: number, userId: number) {
    this.router.navigate([`/user/appointment/add-feedback/${userId}/${appointmentId}`]);
  }

  delete(appointmentId: number) {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(
      () => {
        this.showToastMessage('Appointment deleted successfully!');
        this.getAllAppointments();
      },
      (error) => {
        this.showToastMessage('Failed to delete appointment');
        // console.error('Error deleting appointment', error);
      }
    );
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}