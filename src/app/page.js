import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.home}>
      <Link href="/uploaded" className={styles.link}>
        View uploaded files
      </Link>
    </main>
  );
}
