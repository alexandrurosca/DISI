package com.example.DISI.Entity;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long budgetID;

    @Column
    private double amount;

    @Column
    private LocalDate startDate;

    @Column
    private  LocalDate endDate;

    @ManyToOne
    private User user;

    public Long getBudgetID() {
        return budgetID;
    }

    public void setBudgetID(Long budgetID) {
        this.budgetID = budgetID;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
