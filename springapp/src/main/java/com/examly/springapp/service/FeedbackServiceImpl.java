package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Appointment;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.AppointmentRepo;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    FeedbackRepo feedbackRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    AppointmentRepo appointmentRepo;

    @Override
    public List<Feedback> getAllFeedback() {
        return feedbackRepo.findAll();
    }

    public Feedback addfeedback(int userId, int appointmentId, Feedback feedback) {
        User user = userRepo.findById(userId).get();
        Appointment appointment = appointmentRepo.findById(appointmentId).get();
        feedback.setUser(user);
        feedback.setAppointment(appointment);
        return feedbackRepo.save(feedback);
    }

    public List<Feedback> getFeedbackById(int userId) {
        List<Feedback> userFeedbacks = new ArrayList<>();
        List<Feedback> allFeedbacks = feedbackRepo.findAll();

        for (Feedback feedback : allFeedbacks) {
            if (feedback.getUser().getUserId() == userId) {
                userFeedbacks.add(feedback); 
            }
        }

            return userFeedbacks;

    }

    public boolean deleteFeedback(int feedbackId) {
        if (feedbackRepo.findById(feedbackId).isPresent()) {

            Feedback feedback1 = feedbackRepo.findById(feedbackId).get();
            if (feedback1 != null) {
                feedbackRepo.deleteById(feedbackId);

                return true;
            }
        }
        return false;

    }

}
