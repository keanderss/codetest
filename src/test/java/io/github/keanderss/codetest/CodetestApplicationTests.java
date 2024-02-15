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
        double testCustomerLoan = 1000000;
        double testCustomerInterest = 99;
        int testCustomerYears = 30;
        Customer testCustomer = new Customer(testCustomerName,testCustomerLoan,testCustomerInterest,testCustomerYears);
        Assertions.assertEquals("NAME", testCustomer.getName());
        Assertions.assertEquals(1000000, testCustomer.getLoan());
        Assertions.assertEquals(99, testCustomer.getInterest());
        Assertions.assertEquals(30, testCustomer.getYears());
        Assertions.assertEquals(82500, (int) testCustomer.getMonthlyPayment());
    }

}
