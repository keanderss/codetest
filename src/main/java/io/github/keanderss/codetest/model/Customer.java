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
    private String name;
    private double loan;
    private double interest;
    private double years;
}
