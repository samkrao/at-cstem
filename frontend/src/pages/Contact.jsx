import React, { useState } from "react";
import { sendContact } from "../api.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function set(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function submit(e) {
    e.preventDefault();
    setStatus(null);

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "err", msg: "Please fill all fields." });
      return;
    }

    try {
      const res = await sendContact(form);
      setStatus({ type: "ok", msg: res.status });
      setForm({ name: "", email: "", message: "" });
    } catch (e2) {
      setStatus({ type: "err", msg: "Failed to send. Is backend running on :8080?" });
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Contact Us</h2>
      <p className="p">Send a message. (Demo endpoint: POST /api/contact)</p>

      {status && (
        <div className={"alert " + (status.type === "ok" ? "ok" : "err")} style={{ marginBottom: 12 }}>
          {status.msg}
        </div>
      )}

      <form className="form" onSubmit={submit}>
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <input className="input" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        <textarea className="input" rows="6" placeholder="Message" value={form.message} onChange={(e) => set("message", e.target.value)} />
        <button className="btn primary" type="submit">Send</button>
      </form>
    </div>
  );
}
