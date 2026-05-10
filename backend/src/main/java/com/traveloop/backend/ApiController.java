package com.traveloop.backend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        validateLogin(request);

        String[] parts = request.email().split("@", 2);
        String name = parts.length > 0 ? parts[0] : request.email();

        return new LoginResponse(request.email(), name);
    }

    @PostMapping("/trip")
    public TripResponse saveTrip(@RequestBody TripRequest request) {
        validateTrip(request);

        String id = "trip_" + System.currentTimeMillis();

        return new TripResponse(
                id,
                request.tripName(),
                request.startDate(),
                request.endDate(),
                request.description()
        );
    }

    private void validateLogin(LoginRequest request) {
        if (request.email() == null || !request.email().contains("@")) {
            throw new IllegalArgumentException("Please enter a valid email address.");
        }

        if (request.password() == null || request.password().length() < 4) {
            throw new IllegalArgumentException("Password must be at least 4 characters.");
        }
    }

    private void validateTrip(TripRequest request) {
        if (request.tripName() == null || request.tripName().isBlank()) {
            throw new IllegalArgumentException("Trip name is required.");
        }

        if (request.startDate() == null || request.startDate().isBlank()) {
            throw new IllegalArgumentException("Start date is required.");
        }

        if (request.endDate() == null || request.endDate().isBlank()) {
            throw new IllegalArgumentException("End date is required.");
        }

        if (request.startDate().compareTo(request.endDate()) >= 0) {
            throw new IllegalArgumentException("End date must be after start date.");
        }

        if (request.description() == null || request.description().isBlank()) {
            throw new IllegalArgumentException("Trip description is required.");
        }
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationError(IllegalArgumentException ex) {
        return Map.of("message", ex.getMessage());
    }

    public record LoginRequest(String email, String password) {
    }

    public record LoginResponse(String email, String name) {
    }

    public record TripRequest(String tripName, String startDate, String endDate, String description) {
    }

    public record TripResponse(String id, String tripName, String startDate, String endDate, String description) {
    }
}
