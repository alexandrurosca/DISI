package com.example.DISI.Service;

import com.example.DISI.DTO.GraphData;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpendingService {
    Logger LOGGER = LoggerFactory.getLogger(SpendingService.class);

    @Autowired
    SpendingRepository spendingRepository;

    @Autowired
    BudgetRepository budgetRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    BudgetService budgetService;


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

        Budget budget =budgetService.getBudgetForUser(user.getUserID());
        budgetService.updateBudgetWithSpendingAmountAdd(spending.getAmount(),budget);

        spending.setBudget(budget);

        LOGGER.info("before : " + spending.toString());


        Spending spending1 = spendingRepository.save(spending);
        LOGGER.info("after : " + spending1.toString());
        return error;

    }

    public Spending updateSpending(SpendingDTO spendingDTO){
        LOGGER.info("before dto update spending : " + spendingDTO.toString());

        Spending spending = spendingRepository.findById(spendingDTO.getSpendingId()).orElse(null);
        if(spending != null){
            Budget budget = budgetRepository.findById(spending.getBudget().getBudgetID()).orElse(null);
            if(budget != null){
                budgetService.updateBudgetWithSpendingAmountModify(spendingDTO.getAmount(),spending.getAmount(),budget);
                spending.setAmount(spendingDTO.getAmount());
                spending.setReason(spendingDTO.getReason());
                spending.setMakingDate(spendingDTO.getDate());
                spending.setBudget(budget);

                Spending spending1 = spendingRepository.save(spending);

                LOGGER.info("after : " + spending1.toString());
                return spending1;
            }
        }

        return null;



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


    public SpendingDTO getSpendingById(Long id, String username){
        List<SpendingDTO> spendingDTOS = getAllSpendings(username);
        return spendingDTOS.stream().filter(item->item.getSpendingId().equals(id)).findFirst().orElse(null);
    }


    public void deleteSpending(long spendingID){

        Optional<Spending> spending = spendingRepository.findById(spendingID);

        if(spending.isPresent()){

            Budget budget = spending.get().getBudget();
            budget.setAmount(budget.getAmount() + spending.get().getAmount());
            budgetRepository.save(budget);
            spendingRepository.deleteById(spendingID);
        }

    }


    public List<GraphData> getDataForGraph(String startDate, String endDate) {

         return  spendingRepository.findByMakingDateBetween(LocalDate.parse(startDate),LocalDate.parse(endDate));

    }

}
