package com.example.DISI.Controller;

import com.example.DISI.DTO.UserDTO;
import com.example.DISI.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EndPoints {

    @Autowired
    UserService userService;


    @PostMapping("/createAccount")
    public void createAccount(@RequestBody UserDTO userDTO){

        userService.createAccount(userDTO);

    }
}
