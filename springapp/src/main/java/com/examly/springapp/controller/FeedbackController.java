package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Feedback;

import com.examly.springapp.service.FeedbackServiceImpl;

@RestController
public class FeedbackController {

    @Autowired
    FeedbackServiceImpl feedbackServiceImpl;

    @GetMapping("/api/feedback")
    public ResponseEntity<?> getAllFeedback() {
        try {
            List<Feedback> feedbacks = feedbackServiceImpl.getAllFeedback();
            if (feedbacks != null) {
                return new ResponseEntity<>(feedbacks, HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(400));
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @PostMapping("/api/feedback/{userId}/{appointmentId}")
    public ResponseEntity<?> addfeedback(@RequestBody Feedback feedback,@PathVariable int userId,@PathVariable int appointmentId) {
        try {
            Feedback feedback1 = feedbackServiceImpl.addfeedback(userId, appointmentId, feedback);
            if (feedback1 != null) {

                return new ResponseEntity<>(feedback1, HttpStatusCode.valueOf(201));
            } else {

                return new ResponseEntity<>(null, HttpStatusCode.valueOf(400));
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }

    }

    @DeleteMapping("/api/feedback/{feedbackId}")
    public ResponseEntity<?> deleteFeedback(@PathVariable int feedbackId) {
        try {
            boolean status = feedbackServiceImpl.deleteFeedback(feedbackId);
            // if (status) {

                return new ResponseEntity<>(status,HttpStatusCode.valueOf(200));
            // } 
           
            // else {
                
            //     return new ResponseEntity<>(status, HttpStatusCode.valueOf(404));

            // }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));

        }

    }

    @GetMapping("/api/feedback/user/{userId}")
    public ResponseEntity<?> getFeedbackById(@PathVariable int userId) {
        try {
            return new ResponseEntity<>(feedbackServiceImpl.getFeedbackById(userId), HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }

    }


   
}
