package com.example.DISI.Service;

import com.example.DISI.DTO.BudgetDTO;
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
import java.util.List;

@Service
public class BudgetService {
    Logger LOGGER = LoggerFactory.getLogger(BudgetService.class);

    @Autowired
    BudgetRepository budgetRepository;

    @Autowired
    UserRepository userRepository;

    public BudgetDTO updateBudget(double amount, String username){

        LOGGER.info("Update budget...");

        Budget budget = new Budget();
        BudgetDTO budgetDTO = new BudgetDTO();
        User user = userRepository.findByAuthorityUsername(username);


        budget.setUser(user);
        budget.setAmount(amount);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate today = LocalDate.now();
        today.format(formatter);

        budget.setStartDate(today);
        budget.setEndDate(today.plus(Constants.PERIOD, ChronoUnit.DAYS));

        budget = budgetRepository.save(budget);

        if(budget != null){
            budgetDTO.setAmount(budget.getAmount());
        }
        return budgetDTO;

    }

    public Budget getBudgetForUser(long userId){
        List<Budget> budgets = budgetRepository.findByUserUserID(userId);

        Budget currentBudget =  budgets.stream().filter(budget ->
                LocalDate.now().isAfter(budget.getStartDate()) && LocalDate.now().isBefore(budget.getEndDate())
        ).findFirst().orElse(null);

        return currentBudget;
    }

    public BudgetDTO getBudgetForUserByUsername(String username){
        List<Budget> budgets = budgetRepository.findByUserAuthorityUsername(username);
//TODO change with equal
        Budget currentBudget =  budgets.stream().filter(budget ->
                LocalDate.now().isAfter(budget.getStartDate()) && LocalDate.now().isBefore(budget.getEndDate())
        ).findFirst().orElse(null);

        BudgetDTO budgetDTO = new BudgetDTO();
        if(currentBudget != null) {
            budgetDTO.setAmount(currentBudget.getAmount());
        }
        return budgetDTO;
    }

    public void updateBudgetWithSpendingAmountAdd(double amount, Budget budget){

        budget.setAmount(budget.getAmount()  - amount);
        budgetRepository.save(budget);
    }

    public void updateBudgetWithSpendingAmountModify(double amountToDelete, double amountToAdd,Budget budget){

        budget.setAmount(budget.getAmount()  - amountToDelete + amountToAdd);
        budgetRepository.save(budget);
    }

}
