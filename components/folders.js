import Folder from "./folder";
import AddFolder from "./addFolder";
import { useEffect, useState } from "react";

//contains all the folders
const Folders = ({ data }) => {
  const [folders, setFolders] = useState(null);

  const addData = (newFolder) => {
    setFolders([...folders, newFolder]);
  };

  useEffect(() => {
    setFolders(data);
    return () => {
      setFolders();
    };
  }, [data]);

  return (
    <>
      {folders ? (
        folders.map((folder) => {
          return <Folder folder={folder.name} key={folder.id} id={folder.id} />;
        })
      ) : (
        <></>
      )}
      <AddFolder addData={addData} />
    </>
  );
};
export default Folders;
