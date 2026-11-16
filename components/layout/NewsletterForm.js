"use client";

import { useState } from "react";
import { PiArrowRight, PiCheckCircle } from "react-icons/pi";
import styles from "./NewsletterForm.module.scss";

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

export default function NewsletterForm({ tone = "deep", source = "footer" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [msg, setMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setState("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source, company: fd.get("company") || "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setState("done");
      setMsg("You're in. Your welcome code is on its way.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form className={`${styles.form} ${styles[tone]}`} onSubmit={onSubmit} noValidate>
      <label htmlFor={`nl-${source}`} className="sr-only">
        Email address
      </label>
      {/* honeypot: hidden from people, bots fill it */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className={styles.hp} aria-hidden="true" />
      <div className={styles.field}>
        <input
          id={`nl-${source}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-invalid={state === "error"}
          aria-describedby={`nl-${source}-msg`}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.btn} disabled={state === "sending"} aria-label="Subscribe">
          {state === "done" ? <PiCheckCircle /> : <PiArrowRight />}
        </button>
      </div>
      <p id={`nl-${source}-msg`} className={`${styles.msg} ${state === "error" ? styles.err : ""}`} role="status" aria-live="polite">
        {msg || "Shade drops, colour tips and 10% off your first order. No spam."}
      </p>
    </form>
  );
}
