package com.examly.springapp.exceptions;

public class PetAlreadyExistsException extends RuntimeException {
    public PetAlreadyExistsException(String message) {
        super(message);
    }
}
