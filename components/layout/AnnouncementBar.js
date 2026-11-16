import { ANNOUNCEMENTS } from "../../data/content";
import styles from "./AnnouncementBar.module.scss";

export default function AnnouncementBar() {
  const loop = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];
  return (
    <div className={styles.bar} role="region" aria-label="Offers">
      <p className="sr-only">{ANNOUNCEMENTS.join(". ")}</p>
      <div className={styles.track} aria-hidden="true">
        {[0, 1].map((k) => (
          <div className={styles.group} key={k}>
            {loop.map((t, i) => (
              <span key={`${k}-${i}`} className={styles.item}>
                {t}
                <span className={styles.sep} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
