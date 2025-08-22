package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.TreatmentRecord;
import com.examly.springapp.service.TreatmentRecordServiceImpl;

@RestController
public class TreatmentRecordController {
    @Autowired
    TreatmentRecordServiceImpl treatmentRecordServiceImpl;

    @PostMapping("/api/user/{userId}/pet/{petId}/appointment/{appointmentId}")
    public ResponseEntity<?> addTreatmentRecord(@PathVariable int userId, @PathVariable int petId,
            @PathVariable int appointmentId, @RequestBody TreatmentRecord recordData) {
        try {
            TreatmentRecord record = treatmentRecordServiceImpl.addTreatmentRecord(userId, petId, appointmentId,recordData);
            if (record != null) {
                return new ResponseEntity<>(record, HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(400));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/api/admin/records")
    public ResponseEntity<?> getAllTreatmentRecords() {
        try {
            List<TreatmentRecord> records = treatmentRecordServiceImpl.getTreatmentRecords();
            return new ResponseEntity<>(records, HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/api/user/records/{userId}")
    public ResponseEntity<?> getTreatRecordById(@PathVariable int userId) {
        try {
            return new ResponseEntity<>(treatmentRecordServiceImpl.getTreatmentRecordByUserId(userId),
                    HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

}
