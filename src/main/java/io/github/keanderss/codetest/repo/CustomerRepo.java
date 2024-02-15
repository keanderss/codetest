package io.github.keanderss.codetest.repo;

import io.github.keanderss.codetest.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepo extends JpaRepository<Customer, Long> {
}
