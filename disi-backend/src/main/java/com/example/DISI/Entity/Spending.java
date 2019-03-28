package com.example.DISI.Entity;



import javax.persistence.*;
import java.sql.Date;

@Entity
public class Spending {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long spendingID;

    @Column
    private  double amount;

    @Column
    private int reason;

    @Column
    private Date makingDate;

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

    public int getReason() {
        return reason;
    }

    public void setReason(int reason) {
        this.reason = reason;
    }

    public Date getMakingDate() {
        return makingDate;
    }

    public void setMakingDate(Date makingDate) {
        this.makingDate = makingDate;
    }

    public Budget getBudget() {
        return budget;
    }

    public void setBudget(Budget budget) {
        this.budget = budget;
    }
}
