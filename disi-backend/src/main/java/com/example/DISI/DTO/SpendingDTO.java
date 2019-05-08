package com.example.DISI.DTO;

import com.example.DISI.Entity.Reason;

import java.time.LocalDate;


public class SpendingDTO {

    private double amount;

    private Reason reason;

    private LocalDate date;

    private Long userID;

    private Long spendingId;

    public SpendingDTO() {
    }

    public SpendingDTO(double amount, Reason reason, LocalDate date, Long userID) {
        this.amount = amount;
        this.reason = reason;
        this.date = date;
        this.userID = userID;
    }

    public Reason getReason() {
        return reason;
    }

    public Long getSpendingId() {
        return spendingId;
    }

    public void setSpendingId(Long spendingId) {
        this.spendingId = spendingId;
    }

    public void setReason(Reason reason) {
        this.reason = reason;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }


    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
