package com.example.DISI.Repository;

import com.example.DISI.DTO.GraphData;
import com.example.DISI.Entity.Spending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;


public interface SpendingRepository extends JpaRepository<Spending,Long> {
    List<Spending> findAllByBudgetUserUserID(Long userID);

    @Query("SELECT   new com.example.DISI.DTO.GraphData(s.reason , count(s.spendingID) )from Spending s where  s.makingDate between ?1 and ?2")
    List<GraphData> findByMakingDateBetween(LocalDate startDate, LocalDate endDate);
}
