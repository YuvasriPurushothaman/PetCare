package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.Pet;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.AppointmentRepo;
import com.examly.springapp.repository.PetRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    
    @Autowired
    AppointmentRepo appointmentRepo;
    @Autowired UserRepo userRepo;
    @Autowired PetRepo petRepo;

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    @Override
    public List<Appointment> getAppointmentByUser(int userId) {
       List<Appointment> userAppointments = new ArrayList<>();
       List<Appointment> allAppointments = appointmentRepo.findAll();

       for (Appointment appointment : allAppointments) {
        if (appointment.getUser().getUserId() == userId) {
            userAppointments.add(appointment); 
        }
       }

        return userAppointments;
    }
       

    @Override
    public Appointment addAppointment(Appointment appointment,int userId, int petId) {
        User user=userRepo.findById(userId).get();
        Pet pet=petRepo.findById(petId).get();
        appointment.setUser(user);
        appointment.setPet(pet);
       return appointmentRepo.save(appointment);
    }

    @Override
    public Appointment getAppointmentById(int appointmentId) {
       return appointmentRepo.findById(appointmentId).get();
    }

    @Override
    public Appointment updateAppointment(int appointmentId, Appointment updateAppointment) {
        Appointment appointment=appointmentRepo.findById(appointmentId).get();
        if(appointment!=null){
            appointment.setAppointmentDate(updateAppointment.getAppointmentDate());
            // appointment.setPet(updateAppointment.getPet());
            appointment.setReason(updateAppointment.getReason());
            appointment.setStatus(updateAppointment.getStatus());
            // appointment.setUser(updateAppointment.getUser());
            return appointmentRepo.save(appointment);
        }
        return null;

       
    }

    @Override
    public boolean deleteAppointment(int appointmentId) {
        Appointment appointment=appointmentRepo.findById(appointmentId).get();
        if(appointment!=null){
            appointmentRepo.deleteById(appointmentId);
            return true;
        }
        return false;
    }
    
}