package com.example.DISI.Repository;

import com.example.DISI.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByAuthorityUsername(String currentUser);

}
