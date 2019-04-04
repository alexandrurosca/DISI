package com.example.DISI.Service;

import com.example.DISI.DTO.UserDTO;
import com.example.DISI.Entity.Budget;
import com.example.DISI.Entity.User;
import com.example.DISI.Repository.BudgetRepository;
import com.example.DISI.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BudgetRepository budgetRepository;

    public User findUserByUsername(String currentUser) {

        User user = userRepository.findByAuthorityUsername(currentUser);
        user.setPassword("");
        return user;
    }

    public void createAccount(){



    }

    public UserDTO createDTO(String currentUser) {

        User user = findUserByUsername(currentUser);
        UserDTO userDTO = new UserDTO();

        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setUserID(user.getUserID());
        userDTO.setAmount(budgetRepository.findByUserUserID(user.getUserID()).getAmount());

        return userDTO;
    }
}
