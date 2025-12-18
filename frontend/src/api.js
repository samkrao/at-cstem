import axios from "axios";

const API_BASE_URL = typeof __API_BASE_URL__ !== "undefined" ? __API_BASE_URL__ : "http://localhost:8080";

export function getToken() {
  return localStorage.getItem("atcstem_token");
}

export function setAuth(auth) {
  if (auth?.token) localStorage.setItem("atcstem_token", auth.token);
  if (auth?.name) localStorage.setItem("atcstem_name", auth.name);
  if (auth?.email) localStorage.setItem("atcstem_email", auth.email);
}

export function clearAuth() {
  localStorage.removeItem("atcstem_token");
  localStorage.removeItem("atcstem_name");
  localStorage.removeItem("atcstem_email");
}

export function getAuthInfo() {
  return {
    token: getToken(),
    name: localStorage.getItem("atcstem_name"),
    email: localStorage.getItem("atcstem_email")
  };
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function register({ name, email, password }) {
  const res = await api.post("/api/auth/register", { name, email, password });
  return res.data;
}

export async function login({ email, password }) {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
}

export async function me() {
  const res = await api.get("/api/me");
  return res.data;
}

export async function sendContact({ name, email, message }) {
  const res = await api.post("/api/contact", { name, email, message });
  return res.data;
}
