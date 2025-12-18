package com.atcstem.resource;

import com.atcstem.dto.AuthResponse;
import com.atcstem.dto.ErrorResponse;
import com.atcstem.dto.LoginRequest;
import com.atcstem.dto.RegisterRequest;
import com.atcstem.service.AuthService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    private static final Logger LOG = Logger.getLogger(AuthResource.class);

    @Inject
    AuthService authService;

    @POST
    @Path("/register")
    public Response register(@Valid RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return Response.status(Response.Status.CREATED).entity(response).build();
        } catch (IllegalArgumentException e) {
            LOG.error("Registration failed", e);
            ErrorResponse error = new ErrorResponse("REGISTRATION_FAILED", e.getMessage());
            return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
        } catch (Exception e) {
            LOG.error("Internal server error during registration", e);
            ErrorResponse error = new ErrorResponse("INTERNAL_ERROR", "An error occurred during registration");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }

    @POST
    @Path("/login")
    public Response login(@Valid LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return Response.ok(response).build();
        } catch (IllegalArgumentException e) {
            LOG.error("Login failed", e);
            ErrorResponse error = new ErrorResponse("LOGIN_FAILED", e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED).entity(error).build();
        } catch (Exception e) {
            LOG.error("Internal server error during login", e);
            ErrorResponse error = new ErrorResponse("INTERNAL_ERROR", "An error occurred during login");
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(error).build();
        }
    }

    @GET
    @Path("/health")
    public Response health() {
        return Response.ok(new AuthResponse("Auth API is running")).build();
    }
}