package com.examly.springapp.model;

import java.util.Date;
import jakarta.persistence.*;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int appointmentId;

    private Date appointmentDate;

    private String reason;

    @ManyToOne
    private User user;

    @ManyToOne
    private Pet pet;
    private String status;

    public int getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Appointment() {
    }

    public Appointment(int appointmentId, Date appointmentDate, String reason, User user, Pet pet, String status) {
        this.appointmentId = appointmentId;
        this.appointmentDate = appointmentDate;
        this.reason = reason;
        this.user = user;
        this.pet = pet;
        this.status = status;
    }


    

}
