package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Feedback;


/**
 * FeedbackService
 */
public interface FeedbackService {

    public List<Feedback> getAllFeedback();
    public Feedback addfeedback(int userId, int appointmentId, Feedback feedback);
    public List<Feedback> getFeedbackById(int userId);
    public boolean deleteFeedback(int feedbackId);
    
}
