package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Pet;
import com.examly.springapp.service.PetServiceImpl;

@RestController
public class PetController {
    @Autowired
    PetServiceImpl petServiceImpl;

    @PostMapping("/api/pet/{userId}")
    public ResponseEntity<?> addPet(@RequestBody Pet addPet, @PathVariable int userId) {
        Pet pet = petServiceImpl.addPet(addPet, userId);
        return new ResponseEntity<>(pet, HttpStatus.CREATED);
    }


    @GetMapping("/api/pet/{petId}")
    public ResponseEntity<?> getPetById(@PathVariable int petId) {
        try {
            Pet pet = petServiceImpl.getPetbyId(petId);
            if (pet != null) {
                return new ResponseEntity<>(pet, HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(400));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }

    @GetMapping("/api/pet/user/{userId}")
    public ResponseEntity<?> getAllPetsByUserId(@PathVariable int userId) {
        try {
            List<Pet> pets = petServiceImpl.getAllPetsByUser(userId);
            if (pets != null) {
                return new ResponseEntity<>(pets, HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(400));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }
    
    @PutMapping("/api/{userId}/pet/{petId}")
    public ResponseEntity<?> updatePetById(@PathVariable int userId, @PathVariable int petId, @RequestBody Pet newPet) {
        Pet pet = petServiceImpl.updatePet(userId, petId, newPet);
        return new ResponseEntity<>(pet, HttpStatus.OK);
    }

    @DeleteMapping("/api/pet/{petId}")
    public ResponseEntity<?> deletePetById(@PathVariable int petId) {
        try {
            boolean status = petServiceImpl.deletePet(petId);
            if (status) {
                return new ResponseEntity<>(status, HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(status, HttpStatusCode.valueOf(404));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(500));
        }
    }
}
