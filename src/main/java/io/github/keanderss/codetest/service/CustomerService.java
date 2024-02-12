package io.github.keanderss.codetest.service;

import io.github.keanderss.codetest.exception.CustomerNotFoundException;
import io.github.keanderss.codetest.model.Customer;
import io.github.keanderss.codetest.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {
    private CustomerRepo customerRepo = null;
    private final WebClient webClient;

    @Autowired
    public CustomerService(CustomerRepo customerRepo, WebClient webClient) {
        this.customerRepo = customerRepo;
        this.webClient = webClient;
    }

    public CustomerService() {
        this.webClient = WebClient.builder().build();
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

    public Mono<ResponseEntity<Customer>> createCustomer(Customer newCustomer) {
        return webClient.post()
                .uri("/customer/add")
                .body(Mono.just(newCustomer), Customer.class)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response -> Mono.error(new WebClientResponseException
                        (response.statusCode().value(), "Bad Request", null, null, null)))
                .onStatus(HttpStatusCode::is5xxServerError, response -> Mono.error(new WebClientResponseException
                        (response.statusCode().value(), "Server Error", null, null, null)))
                .toEntity(Customer.class);
    }
}
