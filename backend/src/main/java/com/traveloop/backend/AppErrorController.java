package com.traveloop.backend;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppErrorController implements ErrorController {

    @RequestMapping("/error")
    public ResponseEntity<String> handleError(HttpServletRequest request) {
        Object status = request.getAttribute("javax.servlet.error.status_code");
        int statusCode = status != null ? Integer.parseInt(status.toString()) : 500;
        String message = "Unexpected error occurred. HTTP status: " + statusCode;
        return ResponseEntity.status(HttpStatus.valueOf(statusCode)).body(message);
    }
}
