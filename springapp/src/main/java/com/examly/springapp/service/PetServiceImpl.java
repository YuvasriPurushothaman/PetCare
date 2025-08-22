package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.PetAlreadyExistsException;
import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.Pet;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.PetRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class PetServiceImpl implements PetService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    PetRepo petRepo;

   

    @Override
    public Pet addPet(Pet pet, int userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
        List<Pet> existingPets = petRepo.findByUser(user);
        for (Pet existingPet : existingPets) {
            if (existingPet.getName().equals(pet.getName()) &&
                existingPet.getBreed().equals(pet.getBreed()) &&
                existingPet.getDateOfBirth().equals(pet.getDateOfBirth()) &&
                existingPet.getSpecies().equals(pet.getSpecies())) {
                throw new PetAlreadyExistsException("Pet with the same details already exists");
            }
        }
        pet.setUser(user);
        return petRepo.save(pet);
    }



    @Override
    public List<Pet> getAllPetsByUser(int userId) {
        User user = userRepo.findById(userId).get();
        if (user != null) {
            List<Pet> pets = petRepo.findByUser(user);
            return pets;
        }
        return null;
    }

    @Override
    public Pet getPetbyId(int petId) {
        Pet pet = petRepo.findById(petId).get();
        return pet;
    }

    @Override
    public Pet updatePet(int userId, int petId, Pet newPet) {
        Pet pet = petRepo.findById(petId).orElseThrow(() -> new RuntimeException("Pet not found"));
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        List<Pet> existingPets = petRepo.findByUser(user);
        for (Pet existingPet : existingPets) {
            if (existingPet.getName().equals(newPet.getName()) &&
                existingPet.getBreed().equals(newPet.getBreed()) &&
                existingPet.getDateOfBirth().equals(newPet.getDateOfBirth()) &&
                existingPet.getSpecies().equals(newPet.getSpecies())) {
                throw new PetAlreadyExistsException("Pet with the same details already exists");
            }
        }

        pet.setName(newPet.getName());
        pet.setBreed(newPet.getBreed());
        pet.setDateOfBirth(newPet.getDateOfBirth());
        pet.setSpecies(newPet.getSpecies());
        pet.setStatus(newPet.getStatus());
        pet.setUser(user);
        return petRepo.save(pet);
    }


    @Override
    public boolean deletePet(int petId) {
        Pet pet = petRepo.findById(petId).get();
        if (pet != null) {
            petRepo.deleteById(petId);
            return true;
        }
        return false;
    }
    
}
