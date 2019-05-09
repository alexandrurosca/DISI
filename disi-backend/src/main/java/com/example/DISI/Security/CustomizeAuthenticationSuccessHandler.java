package com.example.DISI.Security;

import com.example.DISI.DTO.UserDTO;
import com.example.DISI.Entity.User;
import com.example.DISI.Repository.BudgetRepository;
import com.example.DISI.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


@Component
public class CustomizeAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();


    @Autowired
    UserService userService;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        //set our response to OK status
        response.setStatus(HttpServletResponse.SC_OK);
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();

        UserDTO userDto = userService.createDTO(currentUser);
        if(userDto != null) {
            logger.info("Log in success for: " + userDto.toString());
            String employeeJsonString = ow.writeValueAsString(userDto);

            PrintWriter out = response.getWriter();
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(employeeJsonString);
            out.flush();

        }

    }
}
