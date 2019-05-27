package com.example.DISI.Controller;

import com.example.DISI.DTO.BudgetDTO;
import com.example.DISI.Entity.Budget;
import com.example.DISI.Service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class BudgetController {

    @Autowired
    BudgetService budgetService;

    @CrossOrigin
    @PostMapping("/budget/update")
    public ResponseEntity<BudgetDTO> updateBudget(@RequestBody BudgetDTO budgetDTO){

        String username =  SecurityContextHolder.getContext().getAuthentication().getName();
        BudgetDTO response = budgetService.updateBudget(budgetDTO.getAmount(),username);

        if(response != null ) {
            return new ResponseEntity(response,HttpStatus.OK);
        }
        else return  new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @CrossOrigin
    @GetMapping("/budget")
    public ResponseEntity<BudgetDTO> getBudget(){

        String username =  SecurityContextHolder.getContext().getAuthentication().getName();
        BudgetDTO response = budgetService.getBudgetForUserByUsername(username);

        if(response != null ) {
            return new ResponseEntity(response,HttpStatus.OK);
        }
        else return  new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
