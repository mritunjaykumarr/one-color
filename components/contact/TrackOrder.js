"use client";

import { useState } from "react";
import { PiPackage, PiWhatsappLogo } from "react-icons/pi";
import styles from "./TrackOrder.module.scss";

/*
  No tracking backend until Shopify is connected: this explains where the tracking
  link lives and hands the order ID to support on WhatsApp in one tap.
*/
export default function TrackOrder({ whatsapp }) {
  const [id, setId] = useState("");
  const [shown, setShown] = useState(false);
  const clean = id.replace(/[^A-Za-z0-9#-]/g, "").slice(0, 20);
  const valid = clean.replace("#", "").length >= 4;
  const waText = encodeURIComponent(`Hi OneColor, could you help me track order ${clean}?`);

  return (
    <div className={styles.wrap}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) setShown(true);
        }}
      >
        <label htmlFor="track-id" className={styles.label}>
          Order ID
        </label>
        <div className={styles.row}>
          <input
            id="track-id"
            type="text"
            placeholder="#OC1234"
            maxLength={20}
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setShown(false);
            }}
            autoComplete="off"
          />
          <button type="submit" disabled={!valid}>
            Track
          </button>
        </div>
      </form>

      {shown ? (
        <div className={styles.result} role="status">
          <PiPackage aria-hidden="true" />
          <div>
            <p className={styles.resultTitle}>Your tracking link is in your messages.</p>
            <p>
              When order <strong>{clean}</strong> shipped, we sent a live tracking link by SMS, WhatsApp and email. Can&apos;t find it? We&apos;ll send it again in a minute.
            </p>
            <a href={`https://wa.me/${whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer" className={styles.wa}>
              <PiWhatsappLogo aria-hidden="true" /> Get my tracking link
            </a>
          </div>
        </div>
      ) : (
        <p className={styles.hint}>Find your order ID in your confirmation email or SMS. It starts with #OC.</p>
      )}
    </div>
  );
}
