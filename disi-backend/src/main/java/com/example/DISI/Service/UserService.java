package com.example.DISI.Service;

import com.example.DISI.DTO.UserDTO;
import com.example.DISI.Entity.Authorities;
import com.example.DISI.Entity.Budget;
import com.example.DISI.Entity.User;
import com.example.DISI.Repository.AuthorityRepository;
import com.example.DISI.Repository.BudgetRepository;
import com.example.DISI.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;


@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BudgetRepository budgetRepository;
    @Autowired
    AuthorityRepository authorityRepository;

    public User findUserByUsername(String currentUser) {

        User user = userRepository.findByAuthorityUsername(currentUser);
        user.setPassword("");
        return user;
    }

    public void createAccount(UserDTO userDTO){

       validateUser(userDTO);

        Authorities authority = new Authorities();
        authority.setAuthority("ROLE_ADMIN");
        authority.setUsername(userDTO.getUsername());

        authority = authorityRepository.save(authority);

        User newUser = new User();


        newUser.setPassword(userDTO.getPassword());
        newUser.setLastName(userDTO.getLastName());
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setEmail(userDTO.getEmail());
        newUser.setAuthority(authority);

        newUser = userRepository.save(newUser);

        Budget budget = new Budget();

        budget.setAmount(userDTO.getAmount());
        budget.setUser(newUser);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate today = LocalDate.now();
        today.format(formatter);

        budget.setStartDate(today);
        budget.setEndDate(today.plus(Constants.PERIOD, ChronoUnit.DAYS));

        budgetRepository.save(budget);

    }

    private void validateUser(UserDTO userDTO) {

        User exitingUser = userRepository.findByAuthorityUsername(userDTO.getUsername());
        //TODO

    }

    public UserDTO createDTO(String currentUser) {

        User user = findUserByUsername(currentUser);
        UserDTO userDTO = new UserDTO();

        userDTO.setUsername(user.getAuthority().getUsername());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setUserID(user.getUserID());
        userDTO.setAmount(budgetRepository.findByUserUserID(user.getUserID()).getAmount());

        return userDTO;
    }
}
