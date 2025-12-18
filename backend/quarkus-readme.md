# AT-CSTEM Quarkus Backend

Authentication API with Login and Register endpoints using JWT tokens.

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- PostgreSQL 12+
- OpenSSL (for generating JWT keys)

## Project Structure

```
at-cstem-backend/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── atcstem/
│       │           ├── dto/
│       │           │   └── [DTOs].java
│       │           ├── entity/
│       │           │   └── User.java
│       │           ├── resource/
│       │           │   └── AuthResource.java
│       │           └── service/
│       │               └── AuthService.java
│       └── resources/
│           ├── application.properties
│           └── META-INF/
│               └── resources/
│                   ├── privateKey.pem
│                   └── publicKey.pem
├── pom.xml
└── generate-keys.sh
```

## Setup Instructions

### 1. Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE atcstem;

# Exit
\q
```

### 2. Configure Database

Edit `src/main/resources/application.properties` and update these values:

```properties
quarkus.datasource.username=your_db_user
quarkus.datasource.password=your_db_password
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/atcstem
```

### 3. Generate JWT Keys

```bash
# Make the script executable
chmod +x generate-keys.sh

# Run the script
./generate-keys.sh
```

This will create RSA key pair for JWT signing.

### 4. Install Dependencies

```bash
mvn clean install
```

### 5. Run the Application

```bash
# Development mode (with hot reload)
mvn quarkus:dev

# Or using the Quarkus CLI
quarkus dev
```

The API will be available at: `http://localhost:8080`

### 6. Build for Production

```bash
# Create JAR
mvn clean package

# Run the JAR
java -jar target/quarkus-app/quarkus-run.jar
```

## API Endpoints

### Health Check
```
GET /api/auth/health
```

### Register New User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Registration successful"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Login successful"
}
```

### Error Response
```json
{
  "error": "REGISTRATION_FAILED",
  "message": "Email already registered"
}
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Connecting React Frontend

Update your React frontend to use these endpoints:

```javascript
// Register
const response = await fetch('http://localhost:8080/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })
});

const data = await response.json();

if (response.ok) {
  // Store token
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify({
    id: data.id,
    name: data.name,
    email: data.email
  }));
}
```

## Security Features

- ✅ Password hashing using BCrypt
- ✅ JWT token authentication
- ✅ CORS configuration for React frontend
- ✅ Input validation
- ✅ Secure password requirements (min 6 characters)
- ✅ Email validation
- ✅ Error handling

## Development Tips

### View Database Tables
```bash
psql -U postgres -d atcstem

\dt  # List tables
SELECT * FROM users;  # View users
```

### Hot Reload
Quarkus dev mode supports hot reload. Just save your Java files and changes will be reflected automatically.

### API Documentation
Access Swagger UI at: `http://localhost:8080/q/swagger-ui/`

## Troubleshooting

### Port Already in Use
```bash
# Change port in application.properties
quarkus.http.port=8081
```

### Database Connection Error
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify credentials in `application.properties`
- Ensure database exists: `psql -U postgres -l`

### JWT Key Errors
- Regenerate keys: `./generate-keys.sh`
- Ensure keys are in `src/main/resources/META-INF/resources/`

## License

MIT License