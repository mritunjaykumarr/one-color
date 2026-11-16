"use client";

import { useState } from "react";
import { PiPaperPlaneTilt, PiCheckCircle } from "react-icons/pi";
import styles from "./ContactForm.module.scss";

const TOPICS = [
  { id: "order", label: "My order" },
  { id: "shade", label: "Choosing a shade" },
  { id: "product", label: "Using the product" },
  { id: "returns", label: "Returns & exchange" },
  { id: "other", label: "Something else" },
];

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const PHONE_RE = /^[+\d][\d\s-]{6,18}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  if (!EMAIL_RE.test(v.email.trim().toLowerCase())) e.email = "Please enter a valid email.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (v.message.trim().length < 10) e.message = "Please add a little more detail (10+ characters).";
  return e;
}

const EMPTY = { name: "", email: "", phone: "", topic: "order", orderId: "", message: "" };

export default function ContactForm() {
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [msg, setMsg] = useState("");

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setState("error");
      setMsg("Please check the highlighted fields.");
      const first = Object.keys(errs)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, company: fd.get("company") || "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || "Something went wrong.");
      }
      setState("done");
      setV(EMPTY);
    } catch (err) {
      setState("error");
      setMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div className={styles.done} role="status">
        <PiCheckCircle aria-hidden="true" />
        <p className={styles.doneTitle}>Message received.</p>
        <p>We reply within one working day, usually much sooner. Keep an eye on your inbox.</p>
        <button type="button" className={styles.again} onClick={() => setState("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  const field = (k) => ({
    id: `cf-${k}`,
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `cf-${k}-err` : undefined,
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className={styles.hp} aria-hidden="true" />

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-name">Name</label>
          <input {...field("name")} type="text" autoComplete="name" maxLength={80} value={v.name} onChange={set("name")} required />
          {errors.name ? <p id="cf-name-err" className={styles.err}>{errors.name}</p> : null}
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-email">Email</label>
          <input {...field("email")} type="email" inputMode="email" autoComplete="email" maxLength={254} value={v.email} onChange={set("email")} required />
          {errors.email ? <p id="cf-email-err" className={styles.err}>{errors.email}</p> : null}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="cf-phone">
            Phone <span>(optional)</span>
          </label>
          <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" maxLength={20} value={v.phone} onChange={set("phone")} />
          {errors.phone ? <p id="cf-phone-err" className={styles.err}>{errors.phone}</p> : null}
        </div>
        <div className={styles.field}>
          <label htmlFor="cf-orderId">
            Order ID <span>(optional)</span>
          </label>
          <input {...field("orderId")} type="text" maxLength={30} placeholder="#OC1234" value={v.orderId} onChange={set("orderId")} />
        </div>
      </div>

      <fieldset className={styles.topics}>
        <legend>What&apos;s it about?</legend>
        <div className={styles.topicList}>
          {TOPICS.map((t) => (
            <label key={t.id} className={`${styles.topic} ${v.topic === t.id ? styles.topicOn : ""}`}>
              <input type="radio" name="topic" value={t.id} checked={v.topic === t.id} onChange={set("topic")} />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="cf-message">Message</label>
        <textarea {...field("message")} rows={5} maxLength={2000} value={v.message} onChange={set("message")} placeholder="Tell us a little about your hair or your order…" required />
        <div className={styles.counter}>
          {errors.message ? <p id="cf-message-err" className={styles.err}>{errors.message}</p> : <span />}
          <span className="tnum">{v.message.length}/2000</span>
        </div>
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"} <PiPaperPlaneTilt aria-hidden="true" />
        </button>
        <p className={`${styles.status} ${state === "error" ? styles.statusErr : ""}`} role="status" aria-live="polite">
          {state === "error" ? msg : "We never share your details."}
        </p>
      </div>
    </form>
  );
}
