import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Folders from "../../components/folders";
import Layout from "../../components/Layout";
import styles from "../../styles/Main.module.css";
import { getFolders } from "../api/user/folders";

// Home page after logging in
const MainPage = ({ data }) => {
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
        <Folders data={data} />
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

export const getServerSideProps = async ({ req, res }) => {
  const files = await getFolders(req, res);
  return {
    props: {
      data: files,
    },
  };
};

export default MainPage;
