package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.Pet;
import com.examly.springapp.model.TreatmentRecord;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.AppointmentRepo;
import com.examly.springapp.repository.PetRepo;
import com.examly.springapp.repository.TreatmentRecordRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class TreatmentRecordServiceImpl implements TreatmentRecordService {

    @Autowired
    TreatmentRecordRepo treatmentRecordRepo;

    @Autowired
    AppointmentRepo appointmentRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    PetRepo petRepo;

    @Override
    public TreatmentRecord addTreatmentRecord(int userId, int petId, int appointmentId, TreatmentRecord record) {
        User user = userRepo.findById(userId).get();
        Appointment appointment = appointmentRepo.findById(appointmentId).get();
        Pet pet = petRepo.findById(petId).get();
        if (pet != null || user != null || appointment != null) {
            record.setAppointment(appointment);
            record.setPet(pet);
            record.setUser(user);
            record.setReason(appointment.getReason());
            record.setStatus(appointment.getStatus());
            return treatmentRecordRepo.save(record);
        }
        return null;
    }

    public List<TreatmentRecord> getTreatmentRecords() {
        return treatmentRecordRepo.findAll();
    }

    @Override
    public List<TreatmentRecord> getTreatmentRecordByUserId(int userId) {
        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return treatmentRecordRepo.findByUser(user);
        } else {
            return null; 
        }
    }

}