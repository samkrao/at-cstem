package com.atcstem.contact;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContactController {

    @PostMapping("/contact")
    public ContactResponse contact(@Valid @RequestBody ContactRequest req) {
        // Demo: in production, send email / store in DB / push to CRM
        return new ContactResponse("Thanks! We received your message.", req.email);
    }

    public static class ContactRequest {
        @NotBlank @Size(max = 120)
        public String name;

        @NotBlank @Email @Size(max = 200)
        public String email;

        @NotBlank @Size(max = 2000)
        public String message;
    }

    public record ContactResponse(String status, String email) {}
}
