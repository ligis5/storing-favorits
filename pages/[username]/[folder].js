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
import { useRef, useEffect } from "react";

// Main page after logging in after clicing to any of the folders inside main page
const FolderMainPage = ({ data, dataF }) => {
  const { links, folders } = styles;
  const foldersRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // scroll left or right
  let timer;
  const scroll = (num) => {
    timer = setInterval(() => {
      foldersRef.current.scrollLeft += num;
    }, 50);
  };
  // when holding button scroll left or right, if mouse is not pressed or mouse moves away from button clear timer
  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (left && right) {
      left.addEventListener("mousedown", () => scroll(-10));
      right.addEventListener("mousedown", () => scroll(10));
      left.addEventListener("mouseup", () => clearInterval(timer));
      right.addEventListener("mouseup", () => clearInterval(timer));
      left.addEventListener("mouseleave", () => clearInterval(timer));
      right.addEventListener("mouseleave", () => clearInterval(timer));
    }
  }, [leftRef, rightRef]);

  return (
    <div>
      <Layout>
        <div className={folders} ref={foldersRef}>
          <div
            ref={leftRef}
            style={{
              width: "calc(1.5vh + 1.5vw)",
              display: "grid",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
              position: "fixed",
              left: 0,
            }}
          >
            <FontAwesomeIcon
              style={{
                fontSize: "calc(1.5vh + 1.5vw)",
                filter: "drop-shadow(1px 1px red)",
              }}
              icon={faCaretSquareLeft}
            />
          </div>
          <Folders data={dataF} />
          <div
            ref={rightRef}
            style={{
              width: "calc(1.5vh + 1.5vw)",
              display: "grid",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
              position: "fixed",
              right: 0,
            }}
          >
            <FontAwesomeIcon
              icon={faCaretSquareRight}
              style={{
                fontSize: "calc(1.5vh + 1.5vw)",
                filter: "drop-shadow(1px 1px red)",
              }}
            />
          </div>
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
  const folders = await getFolders(req, res, 10);
  return {
    props: {
      data: files,
      dataF: folders,
    },
  };
};

export default FolderMainPage;
