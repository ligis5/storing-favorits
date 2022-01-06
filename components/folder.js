import {
  faFolder,
  faFolderOpen,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Options from "./options/options";
import { useState } from "react";
import Link from "next/link";
import { useData } from "./getData";
import { useAuth } from "./firebase/authenticate";
import { url } from "../url";

// single styled folder
const Folder = ({ folder, id }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { renameFolder } = useData();
  const [openOptions, setOpenOptions] = useState(false);
  const [newTitle, setNewTitle] = useState(false);
  const [newTitleValue, setNewTitleValue] = useState("");

  const style = {
    fontSize: "calc(2vh + 2vw)",
    color: "rgb(137, 43, 226)",
    filter: "drop-shadow(1px 1px red)",
    justifySelf: "center",
  };

  const openClose = () => {
    setOpenOptions(openOptions ? false : true);
  };

  // Send folders id and new title
  const sendNewTitle = async (id, newTitle) => {
    const res = await fetch(`${url}/api/user/folders/renameFolder`, {
      withCredentials: true,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user.uid}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ id, newTitle }),
    });
    if (!res.ok) {
      console.log(res.statusText);
    }
    if (res.ok) {
      renameFolder(id, newTitle);
      changeTitle();
    }
  };
  // show input and close file options.
  const changeTitle = () => {
    setNewTitle(newTitle ? false : true);
    setOpenOptions(false);
  };

  const submitTitle = (e) => {
    e.preventDefault();
    sendNewTitle(id, newTitleValue);
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
        key={folder}
        href={
          router.pathname === "/[username]/folders"
            ? `/${user ? user.uid : "folder"}/folders/${folder}`
            : `/${user ? user.uid : "folder"}/${folder}`
        }
      >
        <a
          style={{
            display: "flex",
            justifyContent: "center",
            width: "min-content",
            margin: "auto",
          }}
        >
          <FontAwesomeIcon
            style={style}
            icon={router.query.folder === folder ? faFolderOpen : faFolder}
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
          {folder}
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
            path={`${url}/api/user/folders/deleteFolder`}
          />
        </>
      )}
    </div>
  );
};
export default Folder;
