package com.example.DISI.DTO;

import com.example.DISI.Entity.Reason;

public class GraphData {

    private Reason reason;
    private long quantity;

    public GraphData(Reason reason, long quantity) {
        this.reason = reason;
        this.quantity = quantity;
    }

    public Reason getReason() {
        return reason;
    }

    public void setReason(Reason reason) {
        this.reason = reason;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
}
