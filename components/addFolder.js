import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { url } from "../url";
import { useAuth } from "./firebase/authenticate";

const style = {
  fontSize: "calc(2vh + 2vw)",
  color: "rgb(137, 43, 226)",
  filter: "drop-shadow(1px 1px red)",
  justifySelf: "center",
};

const AddFolder = () => {
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);
  const [newFolder, setNewFolder] = useState("");

  //open close input
  const addingFolder = () => {
    setAdding(adding ? false : true);
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
    if (!res.ok) {
      console.log(error);
    } else {
      console.log(res.json());
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

  return (
    <div style={{ display: "grid", justifyContent: "center" }}>
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
            color: "black",
            fontSize: "calc(50% + 0.5vw)",
          }}
        >
          Add Folder
        </h5>
      ) : (
        <form onSubmit={submitFolder}>
          <input
            required
            min="1"
            max="20"
            type="text"
            placeholder="folders name"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
          />
        </form>
      )}
    </div>
  );
};

export default AddFolder;
