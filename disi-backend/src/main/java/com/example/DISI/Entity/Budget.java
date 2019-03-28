package com.example.DISI.Entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long budgetID;

    @Column
    private double amount;

    @Column
    private Date startDate;

    @Column
    private  Date endDate;

    @ManyToOne
    private User user;

    public long getBudgetID() {
        return budgetID;
    }

    public void setBudgetID(long budgetID) {
        this.budgetID = budgetID;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
