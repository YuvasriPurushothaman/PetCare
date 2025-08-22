package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.TreatmentRecord;

public interface TreatmentRecordService {

    public TreatmentRecord addTreatmentRecord(int userId, int petId, int appointmentId, TreatmentRecord record);

    public List<TreatmentRecord> getTreatmentRecords();

    public List<TreatmentRecord> getTreatmentRecordByUserId(int userId);
}
