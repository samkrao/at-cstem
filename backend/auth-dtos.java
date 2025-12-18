package com.atcstem.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Registration Request
public class RegisterRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    public String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    public String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    public String password;
}

// Login Request
public class LoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    public String email;

    @NotBlank(message = "Password is required")
    public String password;
}

// Auth Response
public class AuthResponse {
    public Long id;
    public String name;
    public String email;
    public String token;
    public String message;

    public AuthResponse(Long id, String name, String email, String token, String message) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.token = token;
        this.message = message;
    }

    public AuthResponse(String message) {
        this.message = message;
    }
}

// Error Response
public class ErrorResponse {
    public String error;
    public String message;

    public ErrorResponse(String error, String message) {
        this.error = error;
        this.message = message;
    }
}