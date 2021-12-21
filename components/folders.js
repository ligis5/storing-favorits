import Folder from "./folder";
import { useEffect, useState } from "react";
import { url } from "../url";
import { useAuth } from "./firebase/authenticate";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const style = {
  fontSize: "calc(2vh + 2vw)",
  color: "rgb(137, 43, 226)",
  filter: "drop-shadow(1px 1px red)",
};

const Folders = () => {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);

  const getFolders = async () => {
    const response = await fetch(`${url}/api/${user.uid}/folders`);
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const data = await response.json();
    setFolders(data.folders);
  };

  useEffect(() => {
    if (user) {
      getFolders();
    }

    return () => {
      setFolders([]);
    };
  }, [user]);

  return (
    <>
      {folders.map((folder) => {
        return (
          <Link
            key={Object.keys(folder)[0]}
            href={`/main/${Object.keys(folder)[0]}`}
          >
            <a>
              <Folder
                name={Object.keys(folder)[0]}
                values={Object.values(folder)}
                key={Object.keys(folder)[0]}
              />
            </a>
          </Link>
        );
      })}
      <FontAwesomeIcon style={style} icon={faFolderPlus} />
    </>
  );
};
export default Folders;
