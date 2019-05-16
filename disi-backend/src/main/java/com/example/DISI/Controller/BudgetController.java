package com.example.DISI.Controller;

import com.example.DISI.DTO.BudgetDTO;
import com.example.DISI.Entity.Budget;
import com.example.DISI.Service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class BudgetController {

    @Autowired
    BudgetService budgetService;

    @CrossOrigin
    @PostMapping("/update")
    public ResponseEntity<Budget> updateBudget(@RequestBody double amount){

        String username =  SecurityContextHolder.getContext().getAuthentication().getName();
        BudgetDTO response = budgetService.updateBudget(amount,username);

        if(response != null ) {
            return new ResponseEntity(response,HttpStatus.OK);
        }
        else return  new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
    }

}
