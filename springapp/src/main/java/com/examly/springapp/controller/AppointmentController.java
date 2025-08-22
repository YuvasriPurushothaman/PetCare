package com.examly.springapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.service.AppointmentServiceImpl;

@RestController
public class AppointmentController {
    private static final Logger logger = LoggerFactory.getLogger(AppointmentController.class);
    @Autowired
    AppointmentServiceImpl appointmentServiceImpl;

    @PostMapping("/api/appointments/{userId}/{petId}")
    public ResponseEntity<?> addAppointment(@RequestBody Appointment appointment, @PathVariable int userId, @PathVariable int petId) {
        try {

            return new ResponseEntity<>(appointmentServiceImpl.addAppointment(appointment,userId,petId),
                    HttpStatusCode.valueOf(201));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/api/appointments/user/{userId}")
    public ResponseEntity<?> getAppointmentByUser(@PathVariable int userId) {
        try {
            if(appointmentServiceImpl.getAppointmentByUser(userId).isEmpty()){
               return new ResponseEntity<>(null,HttpStatusCode.valueOf(404)); 
            }else{

                return new ResponseEntity<>(appointmentServiceImpl.getAppointmentByUser(userId),HttpStatusCode.valueOf(200));
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/api/appointments/{appointmentId}")
    public ResponseEntity<?> getAppointment(@PathVariable int appointmentId) {
        try {

            return new ResponseEntity<>(appointmentServiceImpl.getAppointmentById(appointmentId),
                    HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @PutMapping("/api/appointments/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable int id, @RequestBody Appointment updAppointment) {
        try {

            return new ResponseEntity<>(appointmentServiceImpl.updateAppointment(id, updAppointment),
                    HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @DeleteMapping("/api/appointments/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable int id) {
        try {

            return new ResponseEntity<>(appointmentServiceImpl.deleteAppointment(id), HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/api/appointments")
    public ResponseEntity<?> getAllAppointments() {
        try {
            List<Appointment> appointments = appointmentServiceImpl.getAllAppointments();
            if (appointments != null) {
                return new ResponseEntity<>(appointments, HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(400));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }
}