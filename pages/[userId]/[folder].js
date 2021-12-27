import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Files from "../../components/files";
import Folders from "../../components/folders";
import Layout from "../../components/Layout";
import styles from "../../styles/Main.module.css";
import { url } from "../../url";

export async function getServerSideProps(context) {
  const resFolders = await fetch(`${url}/api/${context.query.userId}/folders`);
  const foldersData = await resFolders.json();
  const resFiles = await fetch(
    `${url}/api/${context.query.userId}/folders/${context.query.folder}`
  );
  const filesData = await resFiles.json();
  return {
    props: { foldersData, filesData },
  };
}

// Main page after logging in after clicing to any of the folders inside main page
const FolderMainPage = ({ foldersData, filesData }) => {
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
        <div className={links}>
          <Files filesData={filesData} />
        </div>
      </Layout>
    </div>
  );
};

export default FolderMainPage;
