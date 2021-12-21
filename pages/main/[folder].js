import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Files from "../../components/files";
import Folders from "../../components/folders";
import Layout from "../../components/Layout";
import styles from "../../styles/Main.module.css";
import { useRouter } from "next/router";

const FolderMainPage = () => {
  const router = useRouter();

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
          <Folders />
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
          <Files folderId={router.query.folder} />
        </div>
      </Layout>
    </div>
  );
};

export default FolderMainPage;
