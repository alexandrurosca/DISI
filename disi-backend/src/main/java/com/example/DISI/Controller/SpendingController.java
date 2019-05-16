package com.example.DISI.Controller;

import com.example.DISI.DTO.SpendingDTO;
import com.example.DISI.Entity.Spending;
import com.example.DISI.Service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@CrossOrigin
public class SpendingController {

    @Autowired
    SpendingService spendingService;

    @CrossOrigin
    @PostMapping("/createSpending")
    public ResponseEntity<String> createSpending(@RequestBody SpendingDTO spendingDTO, HttpSession session) {


        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String response = spendingService.createSpending(username, spendingDTO);
        if (response.equals("")) {
            return new ResponseEntity(HttpStatus.OK);
        } else return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @CrossOrigin
    @GetMapping("/listSpending")
    public ResponseEntity<List<SpendingDTO>> listAccount() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<SpendingDTO> spendingList = spendingService.getAllSpendings(username);
        if (spendingList != null) {
            return new ResponseEntity(spendingList, HttpStatus.OK);
        } else return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @CrossOrigin
    @DeleteMapping("/delete/spending/{id}")
    public ResponseEntity listAccount(@PathVariable("id") long spendingId) {

        spendingService.deleteSpending(spendingId);

        return new ResponseEntity(HttpStatus.OK);

    }

    @CrossOrigin
    @PostMapping("/update/spending")
    public ResponseEntity updateSpending(@RequestBody SpendingDTO spendingDTO) {

        Spending response = spendingService.updateSpending(spendingDTO);

        if (response != null) {
            return new ResponseEntity(response, HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
