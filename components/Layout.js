import Head from "next/head";
import folderIcon from "../public/icons/folder-icon.png";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./firebase/authenticate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Layout = ({ children, title, description }) => {
  const router = useRouter();
  const { user, logOut } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
    if (!user) {
      setLoggedIn(false);
    }
    return () => {
      setLoggedIn(false);
    };
  }, [user]);
  const signOut = async () => {
    await logOut();
    router.push("/login");
  };
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="favorites folder, website saver, home page"
        />
      </Head>
      <header className="header">
        <Link href={user ? `/${user.uid}` : "/login"}>
          <a>
            <Image width="50%" height="50%" alt="folder" src={folderIcon} />
          </a>
        </Link>
        {!loggedIn ? (
          <div className="login">
            <Link href="/register">
              <h3 style={{ cursor: "pointer" }}>Register</h3>
            </Link>
            <Link href="/login">
              <h3 style={{ cursor: "pointer" }}>Login</h3>
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              gap: "3vw",
              fontSize: "calc(60% + 0.5vw)",
            }}
          >
            {router.pathname === "/[userId]/folders" ? (
              <Link href={`/${user.uid}`}>
                <h3 style={{ cursor: "pointer" }}>Home</h3>
              </Link>
            ) : (
              <Link href={`/${user.uid}/folders`}>
                <h3 style={{ cursor: "pointer" }}>Folders</h3>
              </Link>
            )}
            <Link href="/login">
              <h3 onClick={signOut} style={{ cursor: "pointer" }}>
                Log Out
              </h3>
            </Link>
          </div>
        )}
      </header>
      {children}
    </div>
  );
};

Layout.defaultProps = {
  title: "Favorites",
  description: "All in one place for your favorite sites to be stored.",
};

export default Layout;
