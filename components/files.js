import File from "./file";
import AddFile from "./addFile";

// all the files inside folder
const Files = ({ filesData }) => {
  return (
    <>
      {filesData ? (
        filesData.map((file) => {
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
