package com.examly.springapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Component
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepo usesrRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
      
        User user =usesrRepo.findByUsername(username);
        if(user==null){
            throw new UsernameNotFoundException(username+" doesnot exists.");

        }
        return new UserPrinciple(user);
    }
}
