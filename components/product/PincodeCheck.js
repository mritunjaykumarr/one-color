"use client";

import { useState } from "react";
import { PiMapPin, PiCheckCircleFill, PiWarningCircle } from "react-icons/pi";
import { checkPincode } from "../../lib/pincode";
import styles from "./PincodeCheck.module.scss";

export default function PincodeCheck() {
  const [pin, setPin] = useState("");
  const [res, setRes] = useState(null);

  function submit(e) {
    e.preventDefault();
    setRes(checkPincode(pin));
  }

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={submit}>
        <PiMapPin aria-hidden="true" className={styles.pinIcon} />
        <label htmlFor="pdp-pin" className="sr-only">
          Delivery PIN code
        </label>
        <input
          id="pdp-pin"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          placeholder="Enter PIN code for delivery date"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
            setRes(null);
          }}
        />
        <button type="submit">Check</button>
      </form>
      <div aria-live="polite">
        {res ? (
          res.ok ? (
            <ul className={styles.result}>
              <li>
                <PiCheckCircleFill aria-hidden="true" /> Delivery by <strong>{res.window}</strong>
              </li>
              <li>
                <PiCheckCircleFill aria-hidden="true" /> {res.cod ? "Cash on delivery available" : "Prepaid only for this PIN"}
              </li>
              {res.express ? (
                <li>
                  <PiCheckCircleFill aria-hidden="true" /> Express delivery eligible
                </li>
              ) : null}
            </ul>
          ) : (
            <p className={styles.error}>
              <PiWarningCircle aria-hidden="true" /> {res.error}
            </p>
          )
        ) : null}
      </div>
    </div>
  );
}
