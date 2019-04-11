package com.example.DISI.Security;

import com.example.DISI.Entity.Authorities;
import com.example.DISI.Entity.Budget;
import com.example.DISI.Entity.User;
import com.example.DISI.Repository.AuthorityRepository;
import com.example.DISI.Repository.BudgetRepository;
import com.example.DISI.Repository.UserRepository;
import com.example.DISI.Service.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

import javax.sql.DataSource;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    BudgetRepository budgetRepository;

    @Autowired
    CustomizeAuthenticationSuccessHandler successHandler;

    @Autowired
    DataSource dataSource;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JdbcUserDetailsManager jdbcUserDetailsManager() throws Exception {
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager();
        jdbcUserDetailsManager.setDataSource(dataSource);
        return jdbcUserDetailsManager;
    }

    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource).passwordEncoder(passwordEncoder());
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
       // createUser();

        // asdasd
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers("/createAccount").permitAll()
                .antMatchers("/logout").permitAll()
                .antMatchers("/login").permitAll()
                .anyRequest().authenticated()
                .and().httpBasic()
                .and().formLogin().successHandler(successHandler);

    }

    private void createUser(){
        Authorities a = new Authorities("admin","ROLE_ADMIN");
        a = authorityRepository.save(a);
        User u = new User("admin","","","",true
                , a);
        u = userRepository.save(u);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate today = LocalDate.now();
        today.format(formatter);

        Budget budget = new Budget();
        budget.setAmount(200);
        budget.setUser(u);
        budget.setStartDate(today);
        budget.setEndDate(today.plus(Constants.PERIOD, ChronoUnit.DAYS));

        budgetRepository.save(budget);
    }

}
