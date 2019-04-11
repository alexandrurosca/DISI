package com.example.DISI.Entity;

import javax.persistence.*;
@Entity
public class Authorities {

    @Id
    @Column(length = 30)
    private String username;

    @Column
    private String authority;

    public Authorities(String username, String authority) {
        this.username = username;
        this.authority = authority;
    }

    public Authorities() {

    }


    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
