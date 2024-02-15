package io.github.keanderss.codetest;

import io.github.keanderss.codetest.model.Customer;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CodetestApplicationTests {

    @Test
    void testCustomer() {
        String testCustomerName = "NAME";
        double testCustomerLoan = 1200;
        double testCustomerInterest = 0;
        int testCustomerYears = 1;
        Customer testCustomer = new Customer(testCustomerName,testCustomerLoan,testCustomerInterest,testCustomerYears);
        System.out.println(testCustomer.getName());
        System.out.println(testCustomer.getLoan());
        System.out.println(testCustomer.getInterest());
        System.out.println(testCustomer.getYears());
        System.out.println(testCustomer.getMonthlyPayment());
        //Assertions.assertEquals(100, testCustomer.getMonthlyPayment());
    }

//    @Test
//    void contextLoads() {
//    }
// TODO:
// TEST THAT MORTGAGE CALCULATIONS FOR CUSTOMERS ARE CORRECT
}
