import Folder from "./folder";
import AddFolder from "./addFolder";
import { useEffect, useState } from "react";

//contains all the folders
const Folders = ({ data }) => {
  const [foldersLeft, setFoldersLeft] = useState(null);
  const [foldersRight, setFoldersRight] = useState(null);

  // if there is less then 10 folders add folder to current array.
  // if left array has half of total data add to right side
  const addData = (newFolder) => {
    if (foldersRight.length + foldersLeft.length === 10) return;

    if (foldersLeft.length > foldersRight.length) {
      setFoldersRight([...foldersRight, newFolder]);
    }
    if (foldersLeft.length < foldersRight.length) {
      setFoldersLeft([...foldersLeft, newFolder]);
    }
  };

  useEffect(() => {
    let left = [];
    let right = [];
    for (let i = 0; i < data.length; i++) {
      if (i < data.length / 2) {
        left.push(data[i]);
      }
      if (i >= data.length / 2) {
        right.push(data[i]);
      }
    }
    setFoldersLeft(left);
    setFoldersRight(right);
    return () => {
      setFoldersLeft();
      setFoldersRight();
    };
  }, [data]);

  const removeFolder = (id) => {
    const filderedFolders = folders.filter((folder) => folder.id !== id);
    setFolders(filderedFolders);
  };
  return (
    <>
      {foldersLeft ? (
        foldersLeft.map((folder) => {
          return (
            <Folder
              folder={folder.title}
              key={folder.id}
              id={folder.id}
              clicks={folder.clicks}
              removeFolder={removeFolder}
            />
          );
        })
      ) : (
        <></>
      )}
      <AddFolder addData={addData} />
      {foldersRight ? (
        foldersRight.map((folder) => {
          return (
            <Folder
              folder={folder.title}
              key={folder.id}
              id={folder.id}
              clicks={folder.clicks}
              removeFolder={removeFolder}
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
export default Folders;
