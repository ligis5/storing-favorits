import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Folders from "../../components/folders";
import Layout from "../../components/Layout";
import styles from "../../styles/Main.module.css";
import { url } from "../../url";

export async function getServerSideProps(context) {
  const res = await fetch(`${url}/api/${context.query.userId}/folders`);
  const foldersData = await res.json();
  return {
    props: { foldersData },
  };
}

// Home page after logging in
const MainPage = ({ foldersData }) => {
  const { folders } = styles;
  return (
    <Layout>
      <div className={folders}>
        <FontAwesomeIcon
          style={{
            fontSize: "calc(1.5vh + 1.5vw)",
            filter: "drop-shadow(1px 1px red)",
          }}
          icon={faCaretSquareLeft}
        />
        <Folders foldersData={foldersData} />
        <FontAwesomeIcon
          icon={faCaretSquareRight}
          style={{
            marginLeft: "auto",
            fontSize: "calc(1.5vh + 1.5vw)",
            filter: "drop-shadow(1px 1px red)",
          }}
        />
      </div>
    </Layout>
  );
};

export default MainPage;
