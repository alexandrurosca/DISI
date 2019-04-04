package com.example.DISI.Security;

import com.example.DISI.Entity.Authorities;
import com.example.DISI.Entity.User;
import com.example.DISI.Repository.UserRepository;
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

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    UserRepository userRepository;

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

//       userRepository.save(new User(1L,"$2a$10$BimKSSncecQvQFxwwUdCmeBxj6wcUqAR3dIwUOBHaImicibEXP/cK","","","",true
//       , new Authorities(1L, "admin", "ROLE_ADMIN")));

        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers("/logout").permitAll()
                .antMatchers("/login").permitAll()
                .anyRequest().authenticated()
                .and().httpBasic()
                .and().formLogin().successHandler(successHandler);

    }

}
