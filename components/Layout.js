import Head from "next/head";
import folderIcon from "../public/icons/folder-icon.png";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children, title, description }) => {
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
        <Link href="/main">
          <a>
            <Image width="50%" height="50%" alt="folder" src={folderIcon} />
          </a>
        </Link>
        <div className="login">
          <Link href="/register">
            <h3>Register</h3>
          </Link>
          <Link href="login">
            <h3>Login</h3>
          </Link>
        </div>
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
