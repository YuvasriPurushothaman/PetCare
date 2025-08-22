package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Appointment;

/**
 * AppointmentService
 */
public interface AppointmentService {

    public List<Appointment> getAllAppointments();
    public List<Appointment> getAppointmentByUser(int userId);
    public Appointment addAppointment(Appointment appoitment ,int userId, int petId);
    public Appointment getAppointmentById(int appointmentId);
    public Appointment updateAppointment(int appointmentId,Appointment updateAppointment);
    public boolean deleteAppointment(int appointmentId);
}