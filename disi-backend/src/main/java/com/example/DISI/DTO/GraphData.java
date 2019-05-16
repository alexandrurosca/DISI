package com.example.DISI.DTO;

import com.example.DISI.Entity.Reason;

public class GraphData {

    private Reason reason;
    private double amount;
    private long quantity;

    public GraphData(Reason reason, double amount, long quantity) {
        this.reason = reason;
        this.amount = amount;
        this.quantity = quantity;
    }

    public Reason getReason() {
        return reason;
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

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
}
