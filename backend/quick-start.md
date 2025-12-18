# Quick Start Guide

## Step-by-Step Setup

### 1. Create Project Structure

```bash
# Create project directory
mkdir -p at-cstem-backend
cd at-cstem-backend

# Create directory structure
mkdir -p src/main/java/com/atcstem/{dto,entity,resource,service}
mkdir -p src/main/resources/META-INF/resources
```

### 2. Create Files

Copy each artifact file to its location:

```
at-cstem-backend/
├── pom.xml
├── generate-keys.sh
├── src/
│   └── main/
│       ├── java/com/atcstem/
│       │   ├── dto/
│       │   │   └── [Create 4 separate files or use one file]
│       │   │       ├── RegisterRequest.java
│       │   │       ├── LoginRequest.java
│       │   │       ├── AuthResponse.java
│       │   │       └── ErrorResponse.java
│       │   ├── entity/
│       │   │   └── User.java
│       │   ├── resource/
│       │   │   └── AuthResource.java
│       │   └── service/
│       │       └── AuthService.java
│       └── resources/
│           └── application.properties
```

**Option 1: Single DTO File**
Create `src/main/java/com/atcstem/dto/DTOs.java` with all DTO classes.

**Option 2: Separate Files (Recommended)**
Split the DTOs into separate files:
- `RegisterRequest.java` - Contains RegisterRequest class
- `LoginRequest.java` - Contains LoginRequest class  
- `AuthResponse.java` - Contains AuthResponse class
- `ErrorResponse.java` - Contains ErrorResponse class

### 3. Setup PostgreSQL

```bash
# Install PostgreSQL (if not installed)
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE atcstem;
\q
```

### 4. Generate JWT Keys

```bash
chmod +x generate-keys.sh
./generate-keys.sh
```

### 5. Run the Application

```bash
# Install dependencies and run
mvn clean install
mvn quarkus:dev
```

The API will be available at `http://localhost:8080`

### 6. Test the API

```bash
# Health check
curl http://localhost:8080/api/auth/health

# Register a user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Next Steps

1. **Connect Frontend**: Update your React app to use `http://localhost:8080/api/auth/`
2. **Add Contact API**: Create a new resource for the contact form
3. **Deploy**: Deploy to production server

## Common Commands

```bash
# Development mode (hot reload)
mvn quarkus:dev

# Run tests
mvn test

# Build for production
mvn clean package

# Run production build
java -jar target/quarkus-app/quarkus-run.jar
```

## Troubleshooting

**Issue: Database connection failed**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Verify database exists
sudo -u postgres psql -l
```

**Issue: Port 8080 already in use**
```bash
# Change port in application.properties
quarkus.http.port=8081
```

**Issue: Maven dependencies not downloading**
```bash
# Clear Maven cache and rebuild
mvn dependency:purge-local-repository
mvn clean install
```