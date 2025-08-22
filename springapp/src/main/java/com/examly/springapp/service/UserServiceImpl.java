package com.examly.springapp.service;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
 
import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exceptions.UsernameAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
 
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    PasswordEncoder passwordEncoder;
 
    @Autowired
    AuthenticationManager authenticationManager;
 
    @Autowired
    UserRepo userRepo;
 
    @Autowired
    JwtUtils jwtUtils;

    
    public boolean registerUser(User user) {
        User existingUser = userRepo.findByUsername(user.getUsername());
        if (existingUser != null) {
            throw new UsernameAlreadyExistsException("Username already exists. Please choose a different username.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return true;
    }

 
    public String loginUser(LoginDTO user){
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if(authentication.isAuthenticated()){
            User selectedUser = userRepo.findByUsername(user.getUsername());
            return jwtUtils.generateToken(user.getUsername(),selectedUser.getUserRole(),selectedUser.getUserId());
        }
        else{
            throw new UsernameNotFoundException("User credentials invalid! Please try again");
        }
    }
    
    public User getUserByUsername(String username){
        User user=userRepo.findByUsername(username);
        if(user!=null){
            return user;
        }else{
            return null;
        }
    }
}