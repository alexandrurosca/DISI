package com.example.DISI.Service;

import com.example.DISI.Entity.User;
import com.example.DISI.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User findUserByUsername(String currentUser) {

        User user = userRepository.findByAuthorityUsername(currentUser);
        user.setPassword("");
        return user;
    }

    public void createAccount(){



    }

}
