import { faPlusCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { url } from "../url";
import { useAuth } from "./firebase/authenticate";

const style = {
  fontSize: "25px",
  filter: "drop-shadow(1px 1px red)",
  justifySelf: "center",
};

const AddFile = () => {
  const route = useRouter();
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);
  const [newFile, setNewFile] = useState("");

  const closeInput = () => {
    setAdding(false);
    setNewFile("");
  };
  //open close input
  const addingFile = () => {
    setAdding(adding ? closeInput : true);
  };
  // send data to backend
  const sendFile = async (data) => {
    const res = await fetch(
      `${url}/api/${user.uid}/folders/${route.query.folder}/addFile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: data,
        }),
      }
    );

    if (!res.ok) {
      console.log(res.statusText);
    }
  };

  // submit form
  const submitFile = (e) => {
    e.preventDefault();
    if (newFile.length > 0) {
      sendFile(newFile);
      setAdding(false);
    }
  };

  // if page is changed close input and clear value
  useEffect(() => {
    return () => {
      setAdding(false);
      setNewFile("");
    };
  }, [route.asPath]);

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        position: "relative",
        zIndex: "999",
      }}
    >
      <FontAwesomeIcon style={style} icon={faPlusCircle} onClick={addingFile} />
      {!adding ? (
        <h5
          style={{
            margin: "0",
            textAlign: "center",
            color: "white",
            fontSize: "calc(50% + 0.5vw)",
          }}
        >
          Add File
        </h5>
      ) : (
        <>
          <div
            onClick={addingFile}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
            }}
          ></div>
          <form onSubmit={submitFile} style={{ zIndex: "9999" }}>
            <input
              required
              min="5"
              id="myURL"
              name="myURL"
              type="url"
              placeholder="some website url"
              pattern="https?://.*"
              value={newFile}
              onChange={(e) => setNewFile(e.target.value)}
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

export default AddFile;
