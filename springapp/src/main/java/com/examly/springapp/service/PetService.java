package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Pet;

public interface PetService {
    public Pet addPet(Pet pet,int userId);
    public Pet getPetbyId(int petId);
    public Pet updatePet(int userId, int petId, Pet newPet);
    public boolean deletePet(int petId);
    public List<Pet> getAllPetsByUser(int userId);
}
