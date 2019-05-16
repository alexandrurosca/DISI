package com.example.DISI.Repository;

import com.example.DISI.Entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget,Long> {
    List<Budget> findByUserUserID(long userID);

    List<Budget> findByUserAuthorityUsername(String username);
}
