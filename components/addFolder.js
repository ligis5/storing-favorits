import { faFolderPlus, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { url } from "../url";
import { useAuth } from "./firebase/authenticate";
import { useData } from "./getData";

const style = {
  fontSize: "calc(2vh + 2vw)",
  color: "rgb(137, 43, 226)",
  filter: "drop-shadow(1px 1px red)",
  justifySelf: "center",
};

const AddFolder = () => {
  const { addFolder } = useData();
  const route = useRouter();
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);
  const [newFolder, setNewFolder] = useState("");

  const closeInput = () => {
    setAdding(false);
    setNewFolder("");
  };
  //open close input
  const addingFolder = () => {
    setAdding(adding ? closeInput : true);
  };
  // send data to backend
  const sendFolder = async (data) => {
    const res = await fetch(`${url}/api/${user.uid}/addFolder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder: data,
      }),
    });
    if (res.ok) {
      const content = await res.json();
      addFolder(content);
      setNewFolder("");
    }
    if (!res.ok) {
      console.log(res.status);
    }
  };

  // submit form
  const submitFolder = (e) => {
    e.preventDefault();
    if (newFolder.length > 0) {
      sendFolder(newFolder);
      setAdding(false);
    }
  };
  // if page is changed close input and clear it.
  useEffect(() => {
    return () => {
      setAdding(false);
      setNewFolder("");
    };
  }, [route.asPath]);

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
      }}
    >
      <FontAwesomeIcon
        style={style}
        icon={faFolderPlus}
        onClick={addingFolder}
      />
      {!adding ? (
        <h5
          style={{
            margin: "0",
            textAlign: "center",
            color: "white",
            fontSize: "calc(50% + 0.5vw)",
          }}
        >
          Add Folder
        </h5>
      ) : (
        <>
          <div
            onClick={addingFolder}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
            }}
          ></div>
          <form onSubmit={submitFolder} style={{ zIndex: "9999" }}>
            <input
              required
              min="1"
              max="20"
              type="text"
              placeholder="folders name"
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
              style={{ height: "10px" }}
            />
          </form>
        </>
      )}
      <FontAwesomeIcon
        style={{
          fontSize: "20px",
          visibility: "hidden",
          justifySelf: "center",
        }}
        icon={faEllipsisH}
      />
    </div>
  );
};

export default AddFolder;
