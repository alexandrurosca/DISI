package com.example.DISI.DTO;

import com.example.DISI.Service.Constants;

import java.time.LocalDate;


public class SpendingDTO {

    private Long spendingID;

    private double amount;

    private Enum<Constants.Reason> reason;

    private LocalDate makingDate;

    private Long userID;

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Enum getReason() {
        return reason;
    }

    public LocalDate getMakingDate() {
        return makingDate;
    }

    public void setMakingDate(LocalDate makingDate) {
        this.makingDate = makingDate;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Long getSpendingID() {
        return spendingID;
    }

    public void setSpendingID(Long spendingID) {
        this.spendingID = spendingID;
    }

    public void setReason(Enum<Constants.Reason> reason) {
        this.reason = reason;
    }
}
