import File from "./file";
import AddFile from "./addFile";
import { useData } from "./getData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// all the files inside folder
const Files = () => {
  const router = useRouter();
  const folderName = router.query.folder;
  const { files, currentFolder } = useData();
  const [folderFiles, setFolderFiles] = useState([]);

  useEffect(() => {
    if (files && folderName) {
      setFolderFiles(files[folderName]);
    }
    return () => setFolderFiles([]);
  });

  return (
    <>
      {folderFiles ? (
        Object.values(folderFiles).map((file) => {
          const fileVal = Object.values(file);
          return (
            <File
              id={fileVal[0].id}
              file={fileVal[0].url}
              key={fileVal[0].url}
              name={fileVal[0].title}
            />
          );
        })
      ) : (
        <></>
      )}
      <AddFile currentFolder={currentFolder} />
    </>
  );
};

export default Files;
