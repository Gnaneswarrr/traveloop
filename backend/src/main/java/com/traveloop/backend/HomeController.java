package com.traveloop.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Traveloop backend is running. Add your API controllers under src/main/java/com/traveloop/backend.";
    }
}
