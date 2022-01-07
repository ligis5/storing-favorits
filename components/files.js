import File from "./file";
import AddFile from "./addFile";
import { useData } from "./getData";
import { useEffect, useState } from "react";

// all the files inside folder
const Files = ({ data }) => {
  const { currentFolder } = useData();
  const [files, setFiles] = useState(null);

  const addData = (newFile) => {
    setFiles([...files, newFile]);
  };

  useEffect(() => {
    setFiles(data);
    return () => {
      setFiles();
    };
  }, [data]);

  return (
    <>
      {files ? (
        Object.values(files).map((file) => {
          return (
            <File
              id={file.title}
              file={file.url}
              key={file.url}
              name={file.title}
              clicks={file.clicks}
            />
          );
        })
      ) : (
        <></>
      )}
      <AddFile currentFolder={currentFolder} addData={addData} />
    </>
  );
};

export default Files;
