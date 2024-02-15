package io.github.keanderss.codetest.service;

import io.github.keanderss.codetest.exception.CustomerNotFoundException;
import io.github.keanderss.codetest.model.Customer;
import io.github.keanderss.codetest.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {
    private final CustomerRepo customerRepo;

    @Autowired
    public CustomerService(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    public Customer addCustomer(Customer customer) {
        customer.setCustomerCode(UUID.randomUUID().toString());
        return customerRepo.save(customer);
    }

    public List<Customer> findAllCustomers() {
        return customerRepo.findAll();
    }

    public Customer updateCustomer(Customer customer) {
        return customerRepo.save(customer);
    }

    public Customer findCustomerById(Long id) {
        return customerRepo.findCustomerById(id).orElseThrow(() -> new CustomerNotFoundException("Customer by " + id + " was not found!"));
    }

    public void deleteCustomer(Long id) {
        customerRepo.deleteCustomerById(id);
    }
}
