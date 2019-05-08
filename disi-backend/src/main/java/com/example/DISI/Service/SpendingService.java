package com.example.DISI.Service;

import com.example.DISI.DTO.SpendingDTO;
import com.example.DISI.Entity.Budget;
import com.example.DISI.Entity.Spending;
import com.example.DISI.Entity.User;
import com.example.DISI.Repository.BudgetRepository;
import com.example.DISI.Repository.SpendingRepository;
import com.example.DISI.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SpendingService {
    Logger LOGGER = LoggerFactory.getLogger(SpendingService.class);

    @Autowired
    SpendingRepository spendingRepository;

    @Autowired
    BudgetRepository budgetRepository;

    @Autowired
    UserRepository userRepository;

    public String createSpending(String username, SpendingDTO spendingDTO){
        LOGGER.info("before dto: " + spendingDTO.toString());
        User user = userRepository.findByAuthorityUsername(username);
        spendingDTO.setUserID(user.getUserID());
        //TODO validation
        String error = validateSpending(spendingDTO);

        if (!error.equals("")) {
            return error;
        }

        Spending spending = new Spending();

        spending.setAmount(spendingDTO.getAmount());
        spending.setReason(spendingDTO.getReason());
        spending.setMakingDate(spendingDTO.getDate());

        Budget budget = budgetRepository.findByUserUserID(spendingDTO.getUserID());

        spending.setBudget(budget);

        LOGGER.info("before : " + spending.toString());


        Spending spending1 = spendingRepository.save(spending);
        LOGGER.info("after : " + spending1.toString());
        return error;

    }

    private String validateSpending(SpendingDTO spendingDTO) {

        if (spendingDTO.getAmount() < 0) {
            return "Amount invalid";
        }

        if (spendingDTO.getReason() == null) {
            return "Reason required ";
        }

        if (spendingDTO.getDate() == null) {
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
            spendingDTO.setDate(spending.getMakingDate());
            spendingDTO.setReason(spending.getReason());
            spendingDTO.setSpendingId(spending.getSpendingID());
            spendingDTOList.add(spendingDTO);
        });
        return spendingDTOList;
    }

}
