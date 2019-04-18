package com.example.DISI.Service;

import com.example.DISI.DTO.SpendingDTO;
import com.example.DISI.Entity.Budget;
import com.example.DISI.Entity.Spending;
import com.example.DISI.Entity.User;
import com.example.DISI.Repository.BudgetRepository;
import com.example.DISI.Repository.SpendingRepository;
import com.example.DISI.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SpendingService {

    @Autowired
    SpendingRepository spendingRepository;

    @Autowired
    BudgetRepository budgetRepository;

    @Autowired
    UserRepository userRepository;

    public String createSpending(String username, SpendingDTO spendingDTO){
        User user = userRepository.findByAuthorityUsername(username);
        //TODO validation
        String error = validateSpending(spendingDTO);

        if (error.equals("")) {
            return error;
        }

        Spending spending = new Spending();

        spending.setAmount(spendingDTO.getAmount());
        spending.setReason(spendingDTO.getReason());
        spending.setMakingDate(spendingDTO.getMakingDate());

        Budget budget = budgetRepository.findByUserUserID(user.getUserID());

        spending.setBudget(budget);

        spendingRepository.save(spending);

        return error;

    }

    private String validateSpending(SpendingDTO spendingDTO) {

        if (spendingDTO.getAmount() < 0) {
            return "Amount invalid";
        }

        if (spendingDTO.getReason() == null) {
            return "Reason required ";
        }

        if (spendingDTO.getMakingDate() == null) {
            return "Date required";
        }

        if (spendingDTO.getUserID() == null) {
            return "User invalid";
        }

        return "";
    }

    public List<SpendingDTO> getAllSpendings(String username){
        User user = userRepository.findByAuthorityUsername(username);
        List<Spending> spendingList = spendingRepository.findAllByBudgetUserUserID(user.getUserID());
        List<SpendingDTO> spendingDTOList = new ArrayList<>();
        spendingList.forEach( spending -> {
            SpendingDTO  spendingDTO = new SpendingDTO();
            spendingDTO.setAmount(spending.getAmount());
            spendingDTO.setMakingDate(spending.getMakingDate());
            spendingDTO.setReason(spending.getReason());
            spendingDTO.setSpendingID(spending.getSpendingID());
            spendingDTOList.add(spendingDTO);
        });
        return spendingDTOList;
    }

}
