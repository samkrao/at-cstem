package com.atcstem.dto;

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
