import File from "./file";
import { useEffect, useState } from "react";
import { url } from "../url";
import { useAuth } from "./firebase/authenticate";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const style = {
  fontSize: "calc(1.5vh + 1.5vw)",
  filter: "drop-shadow(1px 1px red)",
};

const Files = ({ folderId }) => {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    const response = await fetch(`${url}/api/${user.uid}/${folderId}`);
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const data = await response.json();
    setFiles(data.files[0]);
  };

  useEffect(() => {
    if (user) {
      getFiles();
    }

    return () => {
      setFiles([]);
    };
  }, [folderId]);

  return (
    <>
      {Object.values(files).map((file) => {
        return (
          <a key={file}>
            <File file={file} key={file} />
          </a>
        );
      })}
      <FontAwesomeIcon style={style} icon={faPlusCircle} />
    </>
  );
};

export default Files;
