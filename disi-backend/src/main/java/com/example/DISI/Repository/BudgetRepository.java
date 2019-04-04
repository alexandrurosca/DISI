package com.example.DISI.Repository;

import com.example.DISI.Entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget,Long> {
    Budget findByUserUserID(long userID);
}
