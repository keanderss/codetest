package io.github.keanderss.codetest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import io.github.keanderss.codetest.model.Customer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class CodetestApplication {
    private static final List<String> lines = new ArrayList<>();
    private static final ObjectWriter objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();

    public static void main(String[] args) throws IOException {
        SpringApplication.run(CodetestApplication.class, args);
        File file = new File("prospects.txt");
        Scanner scan = new Scanner(file);
        while (scan.hasNext()) {
            String line = scan.nextLine();
            if (!line.isEmpty() && !line.isBlank()) {
                lines.add(line);
            }
        }
        lines.remove(lines.getFirst());
        lines.remove(lines.getLast());
        List<String> temp;
        List<List<String>> temp2 = new ArrayList<>();
        for (String line : lines) {
            line = line.replace(",", " ");
            line = line.replace("\"", "");
            temp = new ArrayList<>(List.of(line.split(" ")));
            temp2.add(temp);
        }
        ArrayList<String> customers = new ArrayList<>();
        for (List<String> stringList: temp2) {
            if (stringList.size() > 4) {
                stringList.set(1, stringList.get(0) + " " + stringList.get(1));
                stringList.removeFirst();
            }
            Customer customer = new Customer(stringList.get(0), Float.parseFloat(stringList.get(1)), Float.parseFloat(stringList.get(2)), Integer.parseInt(stringList.get(3)));
            customers.add(objectWriter.writeValueAsString(customer));
        }
        URL url = new URL("http://localhost:8080/customer/add");
        for (String customer : customers) {
            System.out.println(customer);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setDoOutput(true);
            OutputStream outputStream = con.getOutputStream();
            outputStream.write(customer.getBytes(StandardCharsets.UTF_8));
            System.out.println(con.getResponseCode());
            con.disconnect();
        }
    }
}
