package io.github.keanderss.codetest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {

    @RequestMapping(name = "/", method = RequestMethod.GET)
    public String getString() {
        return "/templates/codetest.html";
    }

}
