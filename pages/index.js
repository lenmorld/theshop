import Head from "next/head"
import Link from "next/link"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Shoppy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Shoppy</h1>
        <div
          style={{
            display: "flex",
            minHeight: "200px",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Link href="/products">
            <button className="buttonPrimary">Start browsing</button>
          </Link>
          {/* <Link href="/test">
            <a>Test page with fetch -> redirect</a>
          </Link> */}
          {/* <Link href="/secret">
            <a>Secret Page</a>
          </Link> */}
          {/* <Link href="/profile">
            <a>Profile Page</a>
          </Link> */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
