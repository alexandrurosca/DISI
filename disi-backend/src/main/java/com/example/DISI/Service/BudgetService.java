package com.example.DISI.Service;

import com.example.DISI.Entity.Budget;
import com.example.DISI.Entity.User;
import com.example.DISI.Repository.BudgetRepository;
import com.example.DISI.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Service
public class BudgetService {
    Logger LOGGER = LoggerFactory.getLogger(BudgetService.class);

    @Autowired
    BudgetRepository budgetRepository;

    @Autowired
    UserRepository userRepository;

    public Budget updateBudget(double amount, String username){

        LOGGER.info("Update budget...");

        Budget budget = new Budget();
        User user = userRepository.findByAuthorityUsername(username);


        budget.setUser(user);
        budget.setAmount(amount);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate today = LocalDate.now();
        today.format(formatter);

        budget.setStartDate(today);
        budget.setEndDate(today.plus(Constants.PERIOD, ChronoUnit.DAYS));

        budget = budgetRepository.save(budget);

        return budget;

    }
}
