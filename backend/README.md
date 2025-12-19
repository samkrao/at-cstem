# AT-CSTEM Quarkus Backend

## Quick Start

1. Start PostgreSQL:
   ```bash
   docker-compose up -d
   ```

2. Generate JWT keys:
   ```bash
   ./generate-keys.sh
   ```

3. Run the application:
   ```bash
   mvn quarkus:dev
   ```

## API Endpoints

- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/health - Health check

## Test

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"pass123"}'
```

## API Documentation

Access Swagger UI: http://localhost:8080/q/swagger-ui/
