import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Home() {
  const { container, main, footer } = styles;
  return (
    <Layout>
      <div className={container}>
        <Head>
          <title>Home</title>
          <meta
            name="description"
            content="All in one place for your favorite sites to be stored."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={main}></main>

        <footer className={footer}></footer>
      </div>
    </Layout>
  );
}
