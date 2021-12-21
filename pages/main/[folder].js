import {
  faPlusCircle,
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Folders from "../../components/folders";
import Layout from "../../components/Layout";
import styles from "../../styles/Main.module.css";

const FolderMainPage = () => {
  const { links, emptyLink, folders } = styles;
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
          <FontAwesomeIcon className={emptyLink} icon={faPlusCircle} />
          <FontAwesomeIcon className={emptyLink} icon={faPlusCircle} />
          <FontAwesomeIcon className={emptyLink} icon={faPlusCircle} />
          <FontAwesomeIcon className={emptyLink} icon={faPlusCircle} />
          <FontAwesomeIcon className={emptyLink} icon={faPlusCircle} />
          <FontAwesomeIcon className={emptyLink} icon={faPlusCircle} />
        </div>
      </Layout>
    </div>
  );
};

export default FolderMainPage;
