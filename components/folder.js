import {
  faFolder,
  faFolderOpen,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Options from "./options/options";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "./firebase/authenticate";
import { url } from "../url";
import { updateData } from "./options/updateData";

// single styled folder
const Folder = ({ folder, id, removeFolder, clicks }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [openOptions, setOpenOptions] = useState(false);
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState(false);
  const [newTitleValue, setNewTitleValue] = useState("");
  const [urlClicks, setUrlClicks] = useState(clicks);

  useEffect(() => {
    setTitle(folder);
    return () => {
      setTitle("");
    };
  }, [folder]);

  const style = {
    fontSize: "calc(2vh + 2vw)",
    color: "rgb(137, 43, 226)",
    filter: "drop-shadow(1px 1px red)",
    justifySelf: "center",
  };

  const openClose = () => {
    setOpenOptions(openOptions ? false : true);
  };

  // show input and close file options.
  const changeTitle = () => {
    setNewTitle(newTitle ? false : true);
    setOpenOptions(false);
    setNewTitleValue("");
  };

  const submitTitle = async (e) => {
    e.preventDefault();
    const t = await updateData(
      id,
      { title: newTitleValue },
      `${url}/api/user/folders/updateFolder`
    );
    if (t) setTitle(t);
    setNewTitle(newTitle ? false : true);
    setNewTitleValue("");
  };

  // adds 1 to amount of clicks on this link.
  const addClick = () => {
    setUrlClicks(urlClicks + 1);
    return urlClicks;
  };

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Link
        key={title}
        href={
          router.pathname === "/[username]/folders"
            ? `/${user ? user.displayName : "folder"}/folders/${folder}`
            : `/${user ? user.displayName : "folder"}/${folder}`
        }
      >
        <a
          onClick={() =>
            updateData(
              id,
              { clicks: addClick() },
              `${url}/api/user/folders/updateFolder`
            )
          }
          style={{
            display: "flex",
            justifyContent: "center",
            width: "min-content",
            margin: "auto",
          }}
        >
          <FontAwesomeIcon
            style={style}
            icon={router.query.folder === title ? faFolderOpen : faFolder}
          />
        </a>
      </Link>
      {!newTitle ? (
        <h5
          style={{
            margin: "0",
            textAlign: "center",
            color: "white",
            fontSize: "calc(50% + 0.5vw)",
          }}
        >
          {title}
        </h5>
      ) : (
        <>
          <form style={{ zIndex: "9999" }} onSubmit={submitTitle}>
            <input
              required
              min="1"
              max="20"
              type="text"
              placeholder="file name"
              value={newTitleValue}
              onChange={(e) => setNewTitleValue(e.target.value)}
              style={{ height: "10px" }}
            />
          </form>
          <div
            onClick={changeTitle}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
            }}
          ></div>
        </>
      )}

      {!openOptions ? (
        <FontAwesomeIcon
          style={{
            fontSize: "20px",
            color: "rgb(137, 43, 226)",
            filter: "drop-shadow(1px 1px red)",
            justifySelf: "center",
          }}
          icon={faEllipsisH}
          onClick={openClose}
        />
      ) : (
        <>
          <FontAwesomeIcon
            style={{
              fontSize: "20px",
              color: "rgb(137, 43, 226)",
              filter: "drop-shadow(1px 1px red)",
              justifySelf: "center",
            }}
            icon={faEllipsisH}
            onClick={openClose}
          />
          <div
            onClick={openClose}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
            }}
          ></div>
          <Options
            title={folder}
            closeOptions={() => setOpenOptions(false)}
            changeTitle={changeTitle}
            id={id}
            removeFolder={removeFolder}
            path={`${url}/api/user/folders/deleteFolder`}
            dataType="folder"
          />
        </>
      )}
    </div>
  );
};
export default Folder;
