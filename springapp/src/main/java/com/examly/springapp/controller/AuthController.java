package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.exceptions.UsernameAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserServiceImpl;

@RestController
@RequestMapping("/api")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    UserServiceImpl userServiceImpl;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
            userServiceImpl.registerUser(user);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
      
    }  
    

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginUser) {
        try {
            return new ResponseEntity<>(userServiceImpl.loginUser(loginUser), HttpStatusCode.valueOf(200));
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatusCode.valueOf(500));
        }
    }


    @GetMapping(path = "/welcome")
    public Map<String, String> welcome() {
        Map<String, String> map = new HashMap<>();
        map.put("message", "helloworld");
        return map;
    }

    @GetMapping(path = "/user/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        // logger.warn(username);
        // System.out.println("Username from the request is :" + username); 
        try {
            User user = userServiceImpl.getUserByUsername(username);
            if (user != null) {

                return new ResponseEntity<>(user, HttpStatusCode.valueOf(200));
            } else {
                return new ResponseEntity<>("No User Found", HttpStatusCode.valueOf(404));

            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }
}