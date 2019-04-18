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
    private Reason reason;

    @Column
    private LocalDate makingDate;

    @ManyToOne
    private Budget budget;


    public Long getSpendingID() {
        return spendingID;
    }

    public Reason getReason() {
        return reason;
    }

    public void setReason(Reason reason) {
        this.reason = reason;
    }

    public void setSpendingID(Long spendingID) {
        this.spendingID = spendingID;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
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

    @Override
    public String toString() {
        return "Spending{" +
                "spendingID=" + spendingID +
                ", amount=" + amount +
                ", reason=" + reason +
                ", makingDate=" + makingDate +
                ", budget=" + budget +
                '}';
    }
}
