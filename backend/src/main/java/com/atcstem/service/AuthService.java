package com.atcstem.service;

import com.atcstem.dto.RegisterRequest;
import com.atcstem.dto.LoginRequest;
import com.atcstem.dto.AuthResponse;
import com.atcstem.entity.User;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import java.time.Duration;
import java.util.HashSet;
import java.util.Set;

@ApplicationScoped
public class AuthService {

    private static final Logger LOG = Logger.getLogger(AuthService.class);

    @ConfigProperty(name = "mp.jwt.verify.issuer")
    String issuer;

    @ConfigProperty(name = "jwt.duration", defaultValue = "86400")
    Long jwtDuration;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (User.existsByEmail(request.email)) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.name = request.name;
        user.email = request.email;
        user.password = BcryptUtil.bcryptHash(request.password);

        user.persist();

        LOG.infof("New user registered: %s", user.email);

        String token = generateToken(user);

        return new AuthResponse(
            user.id,
            user.name,
            user.email,
            token,
            "Registration successful"
        );
    }

    public AuthResponse login(LoginRequest request) {
        User user = User.findByEmail(request.email);

        if (user == null) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        if (!BcryptUtil.matches(request.password, user.password)) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        LOG.infof("User logged in: %s", user.email);

        String token = generateToken(user);

        return new AuthResponse(
            user.id,
            user.name,
            user.email,
            token,
            "Login successful"
        );
    }

    private String generateToken(User user) {
        Set<String> roles = new HashSet<>();
        roles.add("user");

        return Jwt.issuer(issuer)
            .upn(user.email)
            .groups(roles)
            .claim("userId", user.id)
            .claim("name", user.name)
            .expiresIn(Duration.ofSeconds(jwtDuration))
            .sign();
    }
}
