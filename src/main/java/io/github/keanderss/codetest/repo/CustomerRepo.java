package io.github.keanderss.codetest.repo;

import io.github.keanderss.codetest.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, Long> {
    void deleteCustomerById(Long id);

    Optional<Customer> findCustomerById(Long id);
}
