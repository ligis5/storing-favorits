import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Folders from "../../components/folders";
import Layout from "../../components/Layout";
import styles from "../../styles/Main.module.css";
import { getFolders } from "../api/user/folders";
import { useRef, useEffect } from "react";

// Home page after logging in
const MainPage = ({ data }) => {
  const { folders } = styles;
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
        <Folders data={data} />
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
    </Layout>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const files = await getFolders(req, res, 10);
  return {
    props: {
      data: files,
    },
  };
};

export default MainPage;
