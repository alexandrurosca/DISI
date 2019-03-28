package com.example.DISI.Repository;

import com.example.DISI.Entity.Spending;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpendingRepository extends JpaRepository<Spending,Long> {
}
