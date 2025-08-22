import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/models/appointment.model';
import { ViewTreatmentRecord } from 'src/app/models/viewTreatmentRecord.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { TreatmentRecordService } from 'src/app/services/treatment-record.service';

@Component({
  selector: 'app-view-all-appointment',
  templateUrl: './view-all-appointment.component.html',
  styleUrls: ['./view-all-appointment.component.css']
})
export class ViewAllAppointmentComponent implements OnInit {

  appointments: Appointment[] = [];
  appointment: Appointment;
  modelref: NgbModalRef;
  @ViewChild('successModal', { static: true }) successModal: TemplateRef<any>;
  showToast: boolean = false;
  toastMessage: string = '';

  constructor(private appointmentService: AppointmentService, private recordService: TreatmentRecordService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointments().subscribe(
      (data) => {
        this.appointments = data;
        console.log(this.appointments);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModal(appointment: Appointment) {
    this.appointment = appointment;
    this.modelref = this.modal.open(this.successModal);
  }

  reject(value: Appointment) {
    this.appointment = value;
    this.appointment.status = "rejected";  
    this.appointmentService.updateAppointment(this.appointment.appointmentId, this.appointment).subscribe((data) => {
      let updatedData: ViewTreatmentRecord = {
        userId: data.user.userId,
        appointmentId: data.appointmentId,
        petId: data.pet.petId,
        reason: data.reason,
        status: data.status
      };
      this.recordService.addRecord(updatedData).subscribe(() => {
        console.log("Data added in record");
      });
      this.showToastMessage("Appointment rejected");
    },
    (error) => {
      this.showToastMessage('Failed to reject appointment');
    });
  }

  closeAppointment(appointment: Appointment) {
    appointment.status = "completed";
    this.appointmentService.updateAppointment(appointment.appointmentId, appointment).subscribe((data) => {
      console.log(data);         
      let updatedData: ViewTreatmentRecord = {
        userId: data.user.userId,
        appointmentId: data.appointmentId,
        petId: data.pet.petId,
        reason: data.reason,
        status: data.status
      };
      this.recordService.addRecord(updatedData).subscribe(() => {
        console.log("Data added in record");
      });
      this.showToastMessage("Appointment completed");
    },
    (error) => {
      this.showToastMessage('Failed to complete appointment');
    });
  }

  accept() {
    this.modelref.close();
    this.appointment.status = "accepted";
    this.appointmentService.updateAppointment(this.appointment.appointmentId, this.appointment).subscribe(() => {
      this.showToastMessage("Appointment accepted");
    },
    (error) => {
      this.showToastMessage('Failed to accept appointment');
    });
  }

  cancel() {
    this.modelref.close();
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}