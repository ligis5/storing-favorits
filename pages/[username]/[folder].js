import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Files from "../../components/files";
import Folders from "../../components/folders";
import Layout from "../../components/Layout";
import styles from "../../styles/Main.module.css";
import { getFiles } from "../api/user/folders/[folder]";
import { getFolders } from "../api/user/folders";

// Main page after logging in after clicing to any of the folders inside main page
const FolderMainPage = ({ data, dataF }) => {
  const { links, folders } = styles;
  return (
    <div>
      <Layout>
        <div className={folders}>
          <FontAwesomeIcon
            style={{
              fontSize: "calc(1.5vh + 1.5vw)",
              filter: "drop-shadow(1px 1px red)",
            }}
            icon={faCaretSquareLeft}
          />
          <Folders data={dataF} />
          <FontAwesomeIcon
            icon={faCaretSquareRight}
            style={{
              marginLeft: "auto",
              fontSize: "calc(1.5vh + 1.5vw)",
              filter: "drop-shadow(1px 1px red)",
            }}
          />
        </div>
        <div className={links}>
          <Files data={data} />
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  const files = await getFiles(req, res, params.folder);
  const folders = await getFolders(req, res);
  return {
    props: {
      data: files,
      dataF: folders,
    },
  };
};

export default FolderMainPage;
