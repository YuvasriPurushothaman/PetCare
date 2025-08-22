package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Pet;
import com.examly.springapp.model.User;

public interface PetRepo extends JpaRepository<Pet,Integer>{

    public List<Pet> findByUser(User user);
}
