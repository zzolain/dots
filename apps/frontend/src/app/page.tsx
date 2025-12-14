import styles from './page.module.css';
import { HELLO_MESSAGE } from '@repo/shared';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>{HELLO_MESSAGE}</h1>
          <p>WE ARE CONNECTING DOTS</p>
          <p>(NEW RELEASED)</p>
        </div>
      </main>
    </div>
  );
}
