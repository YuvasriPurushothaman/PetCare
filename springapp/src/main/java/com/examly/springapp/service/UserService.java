package com.examly.springapp.service;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;

public interface UserService {

    public String loginUser(LoginDTO loginDTO);
    public boolean registerUser(User user);

}
