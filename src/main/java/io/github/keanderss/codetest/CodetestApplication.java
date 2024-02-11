package io.github.keanderss.codetest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import io.github.keanderss.codetest.model.Customer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

@SpringBootApplication
public class CodetestApplication {
    private static final List<String> lines = new ArrayList<>();
    private static ObjectWriter objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();

    public static void main(String[] args) throws FileNotFoundException, JsonProcessingException {
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
        ArrayList<Customer> customers = new ArrayList<>();
        for (List<String> stringList: temp2) {
            if (stringList.size() > 4) {
                stringList.set(1, stringList.get(0) + " " + stringList.get(1));
                stringList.removeFirst();
            }
            objectWriter.writeValueAsString(new Customer(stringList.get(0), Float.parseFloat(stringList.get(1)), Float.parseFloat(stringList.get(2)), Integer.parseInt(stringList.get(3))));
        }
        WebClient.Builder builder = WebClient.builder();
        String url = "localhost:8080/customer/add";
//        for (String customer : customers) {
//            builder.build().post().uri(url).body().;
//        }
    }
}
