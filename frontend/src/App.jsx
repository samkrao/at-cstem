import React from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { clearAuth, getAuthInfo } from "./api.js";

function Link({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "badge" : "")}
      style={{ padding: "6px 8px", borderRadius: 999 }}
    >
      {children}
    </NavLink>
  );
}

export default function App() {
  const nav = useNavigate();
  const auth = getAuthInfo();

  function logout() {
    clearAuth();
    nav("/login");
  }

  return (
    <div>
      <header className="nav">
        <div className="nav-inner">
          <div className="brand">
            <span style={{ fontSize: 16 }}>AT-CSTEM</span>
            <span className="badge">STEM • Community • Learning</span>
          </div>

          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="row">
            {auth.token ? (
              <>
                <span className="small">Signed in as <b>{auth.name || auth.email}</b></span>
                <button className="btn danger" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <NavLink className="btn" to="/login">Login</NavLink>
                <NavLink className="btn primary" to="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onAuthed={() => nav("/")} />} />
          <Route path="/register" element={<Register onAuthed={() => nav("/")} />} />
        </Routes>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} AT-CSTEM • at-cstem.com
      </footer>
    </div>
  );
}
