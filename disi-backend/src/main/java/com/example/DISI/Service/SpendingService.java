package com.example.DISI.Service;

import com.example.DISI.DTO.SpendingDTO;
import com.example.DISI.Entity.Budget;
import com.example.DISI.Entity.Spending;
import com.example.DISI.Repository.BudgetRepository;
import com.example.DISI.Repository.SpendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpendingService {

    @Autowired
    SpendingRepository spendingRepository;

    @Autowired
    BudgetRepository budgetRepository;

    public String createSpending(SpendingDTO spendingDTO){

        //TODO validation
        String error = "   ";

        if(error.equals("")){
            return error;
        }

        Spending spending = new Spending();

        spending.setAmount(spendingDTO.getAmount());
        spending.setReason(spendingDTO.getReason());
        spending.setMakingDate(spendingDTO.getMakingDate());

        Budget budget = budgetRepository.findByUserUserID(spendingDTO.getUserID());

        spending.setBudget(budget);

        spending = spendingRepository.save(spending);

        return error;

    }

}
