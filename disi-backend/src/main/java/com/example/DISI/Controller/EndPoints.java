package com.example.DISI.Controller;

import com.example.DISI.DTO.UserDTO;
import com.example.DISI.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class EndPoints {

    @Autowired
    UserService userService;

    @CrossOrigin
    @PostMapping("/createAccount")
    public ResponseEntity<String> createAccount(@RequestBody UserDTO userDTO){

        String response = userService.createAccount(userDTO);
        if(response.equals("")) {
            return new ResponseEntity(HttpStatus.OK);
        }
        else return  new ResponseEntity(response,HttpStatus.NOT_ACCEPTABLE);
    }
}
