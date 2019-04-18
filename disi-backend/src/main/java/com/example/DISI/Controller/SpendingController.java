package com.example.DISI.Controller;

import com.example.DISI.DTO.SpendingDTO;
import com.example.DISI.Repository.SpendingRepository;
import com.example.DISI.Service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin
public class SpendingController {

    @Autowired
    SpendingService spendingService;


    @CrossOrigin
    @PostMapping("/createSpending")
    public ResponseEntity<String> createAccount(@RequestBody SpendingDTO spendingDTO, HttpSession session){
        String username =  SecurityContextHolder.getContext().getAuthentication().getName();
        String response = spendingService.createSpending(username, spendingDTO);
        if(response.equals("")) {
            return new ResponseEntity(HttpStatus.OK);
        }
        else return  new ResponseEntity(response,HttpStatus.NOT_ACCEPTABLE);
    }
}
