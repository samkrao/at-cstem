import React, { useEffect, useState } from "react";
import { me, getAuthInfo } from "../api.js";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState("");
  const auth = getAuthInfo();

  useEffect(() => {
    let ignore = false;
    async function load() {
      setErr("");
      setProfile(null);
      if (!auth.token) return;
      try {
        const data = await me();
        if (!ignore) setProfile(data);
      } catch (e) {
        if (!ignore) setErr("Could not load profile. Your token may be invalid.");
      }
    }
    load();
    return () => { ignore = true; };
  }, [auth.token]);

  return (
    <div className="grid">
      <section className="card">
        <h1 className="h1">Welcome to AT‑CSTEM</h1>
        <p className="p">
          This is a starter home page for your organization. Replace the content with your mission,
          programs, events, and calls-to-action.
        </p>

        <div className="kv">
          <div className="item">
            <div className="label">Focus</div>
            <div className="value">STEM Education</div>
          </div>
          <div className="item">
            <div className="label">Audience</div>
            <div className="value">Students & Community</div>
          </div>
          <div className="item">
            <div className="label">Website</div>
            <div className="value">at-cstem.com</div>
          </div>
          <div className="item">
            <div className="label">Stack</div>
            <div className="value">React + Webpack + Spring Boot</div>
          </div>
        </div>
      </section>

      <aside className="card">
        <h3 style={{ marginTop: 0 }}>Account</h3>
        {!auth.token ? (
          <p className="p">Login or Register to see your profile.</p>
        ) : (
          <>
            {err && <div className="alert err">{err}</div>}
            {profile && (
              <div className="alert ok">
                <div><b>Name:</b> {profile.name}</div>
                <div><b>Email:</b> {profile.email}</div>
              </div>
            )}
            {!profile && !err && <p className="p">Loading profile…</p>}
          </>
        )}
        <p className="small" style={{ marginTop: 12 }}>
          This demo uses JWT auth stored in localStorage.
        </p>
      </aside>
    </div>
  );
}
