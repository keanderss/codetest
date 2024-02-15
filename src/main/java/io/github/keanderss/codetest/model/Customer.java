package io.github.keanderss.codetest.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.io.Serializable;

@Entity
public class Customer implements Serializable {
    @Id
    @GeneratedValue
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private double loan;
    @Column(nullable = false)
    private double interest;
    @Column(nullable = false)
    private int years;

    public Customer() {
    }

    public Customer(String name, double loan, double interest, int years) {
        this.name = name;
        this.loan = loan;
        this.interest = interest;
        this.years = years;
    }

    public void setCustomerCode(String string) {
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public double getLoan() {
        return this.loan;
    }

    public double getInterest() {
        return this.interest;
    }

    public int getYears() {
        return years;
    }

    public double getMonthlyPayment() {
        int Z = this.years;
        int p = 12*Z;
        double U = this.loan;
        double b = this.interest/100;
        return U*(b*exp(1+b,p))/(exp(1+b,p)-1);
    }

    private double exp(double a, int b){
        double res =1;
        for (int i = 0; i < b; i++) {
            res *= a;
        }
        return res;
    }

}
