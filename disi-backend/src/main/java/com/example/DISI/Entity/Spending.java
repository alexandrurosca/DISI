package com.example.DISI.Entity;
import com.example.DISI.Service.Constants;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
public class Spending {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long spendingID;

    @Column
    private double amount;

    @Column
    private Enum<Constants.Reason> reason;

    @Column
    private LocalDate makingDate;

    @ManyToOne
    private Budget budget;


    public long getSpendingID() {
        return spendingID;
    }

    public void setSpendingID(long spendingID) {
        this.spendingID = spendingID;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Enum getReason() {
        return reason;
    }

    public void setReason(Enum reason) {
        this.reason = reason;
    }

    public LocalDate getMakingDate() {
        return makingDate;
    }

    public void setMakingDate(LocalDate makingDate) {
        this.makingDate = makingDate;
    }

    public Budget getBudget() {
        return budget;
    }

    public void setBudget(Budget budget) {
        this.budget = budget;
    }
}
