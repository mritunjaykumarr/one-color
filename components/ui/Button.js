import Link from "next/link";
import styles from "./Button.module.scss";

/* variant: solid | outline | ghost | cream ; size: md | lg | sm */
export default function Button({ href, variant = "solid", size = "md", className = "", children, icon, full, ...rest }) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${full ? styles.full : ""} ${className}`;
  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {icon ? <span className={styles.icon} aria-hidden="true">{icon}</span> : null}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}
