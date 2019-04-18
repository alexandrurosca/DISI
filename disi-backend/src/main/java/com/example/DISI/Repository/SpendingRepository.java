package com.example.DISI.Repository;

import com.example.DISI.Entity.Spending;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpendingRepository extends JpaRepository<Spending,Long> {
    List<Spending> findAllByBudgetUserUserID(Long userID);
}
