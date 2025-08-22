package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class TreatmentRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int treatmentId;
    @ManyToOne
    private Pet pet;
    @ManyToOne
    private User user;
    @OneToOne
    private Appointment appointment;
    private String reason;
    private String status;

    public TreatmentRecord() {
    }

    public TreatmentRecord(int treatmentId, Pet pet, User user, Appointment appointment, String reason, String status) {
        this.treatmentId = treatmentId;
        this.pet = pet;
        this.user = user;
        this.appointment = appointment;
        this.reason = reason;
        this.status = status;
    }

    public int getTreatmentId() {
        return treatmentId;
    }

    public void setTreatmentId(int treatmentId) {
        this.treatmentId = treatmentId;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
