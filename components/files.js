import File from "./file";
import AddFile from "./addFile";
import { useData } from "./getData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// all the files inside folder
const Files = () => {
  const router = useRouter();
  const folderName = router.query.folder;
  const { files } = useData();
  const [folderFiles, setFolderFiles] = useState([]);

  useEffect(() => {
    if (files && folderName) {
      setFolderFiles(files[folderName]);
    }
    return () => setFolderFiles([]);
  }, [files]);

  return (
    <>
      {folderFiles ? (
        folderFiles.map((file) => {
          const name = Object.keys(file);
          return (
            <File
              file={file[name].url}
              key={file[name].url}
              name={file[name].title}
            />
          );
        })
      ) : (
        <></>
      )}
      <AddFile />
    </>
  );
};

export default Files;
