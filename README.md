# at-cstem.com Fullstack Starter (React Webpack + Spring Boot)

This repo contains:
- **frontend/**: React (Webpack) SPA with Home / About / Contact / Login / Register
- **backend/**: Spring Boot REST API with JWT auth + H2 database

## Prerequisites
- Node.js 18+ (or 20+)
- Java 17+
- Maven 3.9+

---

## 1) Run backend (Spring Boot)
```bash
cd backend
mvn -q clean spring-boot:run
```

Backend runs on: `http://localhost:8080`

Useful endpoints:
- `POST /api/auth/register`  (public)
- `POST /api/auth/login`     (public)
- `GET  /api/me`             (auth required; Bearer token)
- `POST /api/contact`        (public demo endpoint)

H2 console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:atcstem`
- user: `sa`, password: (empty)

---

## 2) Run frontend (Webpack dev server)
```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

The frontend proxies API calls to `http://localhost:8080` via `API_BASE_URL` in `.env`.
You can edit `frontend/.env` if needed.

---

## 3) Build production
### Frontend build
```bash
cd frontend
npm run build
```
Outputs to `frontend/dist/`.

### Backend jar
```bash
cd backend
mvn -q clean package
java -jar target/atcstem-backend-0.0.1-SNAPSHOT.jar
```

---

## Notes
- This is a starter template (clean, minimal).
- Passwords are hashed (BCrypt).
- JWT is HS256 with a dev secret in `application.yml` — change it before production.
- CORS is enabled for the dev frontend (`http://localhost:3000`).
