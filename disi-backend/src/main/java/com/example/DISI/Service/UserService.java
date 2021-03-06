package com.example.DISI.Service;

import com.example.DISI.DTO.UserDTO;
import com.example.DISI.Entity.Authorities;
import com.example.DISI.Entity.Budget;
import com.example.DISI.Entity.User;
import com.example.DISI.Repository.AuthorityRepository;
import com.example.DISI.Repository.BudgetRepository;
import com.example.DISI.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;


@Service
public class UserService {
    Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    @Autowired
    UserRepository userRepository;

    @Autowired
    BudgetRepository budgetRepository;
    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    BudgetService budgetService;

    public User findUserByUsername(String currentUser) {

        User user = userRepository.findByAuthorityUsername(currentUser);
        user.setPassword("");
        return user;
    }

    public String createAccount(UserDTO userDTO) {
        LOGGER.info("create User Dto: " + userDTO.toString());
        String error = validateUser(userDTO);

        if(!error.equals("")){
            return error;
        }

        Authorities authority = new Authorities();
        authority.setAuthority("ROLE_ADMIN");
        authority.setUsername(userDTO.getUsername());

        authority = authorityRepository.save(authority);

        User newUser = new User();

        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        newUser.setLastName(userDTO.getLastName());
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setEmail(userDTO.getEmail());
        newUser.setEnabled(true);
        newUser.setAuthority(authority);
        newUser.setEnabled(true);

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

        return error;

    }

    private String validateUser(UserDTO userDTO) {

        if (userDTO.getUsername() == null || userDTO.getUsername().isEmpty()) {
            return "Username required";
        }
        User exitingUser = userRepository.findByAuthorityUsername(userDTO.getUsername());

        if (exitingUser != null) {
            return "Username exists";
        }
        if (userDTO.getPassword() == null || userDTO.getPassword().isEmpty()) {
            return "Password required";
        }
        if (userDTO.getLastName() == null || userDTO.getLastName().isEmpty()) {
            return "Last Name required";
        }
        if (userDTO.getFirstName() == null || userDTO.getFirstName().isEmpty()) {
            return "First Name required";
        }
        if (userDTO.getEmail() == null || userDTO.getEmail().isEmpty()) {
            return "Email required";
        }
        if (userDTO.getAmount() <= 0 ) {
            return "Amount invalid";
        }

        return "";
    }

    public UserDTO createDTO(String currentUser) {

        User user = findUserByUsername(currentUser);

        Budget currentBudget =  budgetService.getBudgetForUser(user.getUserID());
        UserDTO userDTO = new UserDTO();

        userDTO.setUsername(user.getAuthority().getUsername());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setUserID(user.getUserID());

        if(currentBudget != null){
            userDTO.setAmount(currentBudget.getAmount());
            userDTO.setStartDate(currentBudget.getStartDate().toString());
            userDTO.setEndDate(currentBudget.getEndDate().toString());
            userDTO.setBudgetExpired(false);
        }else{
            userDTO.setBudgetExpired(true);
        }


        return userDTO;
    }
}
