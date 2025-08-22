package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.User;


public interface AppointmentRepo extends JpaRepository<Appointment,Integer> {
    // public Appointment findByUser(User user);

    
}
