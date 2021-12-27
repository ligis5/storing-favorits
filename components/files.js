import File from "./file";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const style = {
  fontSize: "calc(1.5vh + 1.5vw)",
  filter: "drop-shadow(1px 1px red)",
};

// all the files inside folder
const Files = ({ filesData }) => {
  return (
    <>
      {filesData ? (
        Object.values(filesData).map((file) => {
          if (file === "empty") {
            return;
          } else {
            return (
              <a key={file}>
                <File file={file} key={file} />
              </a>
            );
          }
        })
      ) : (
        <></>
      )}
      <FontAwesomeIcon style={style} icon={faPlusCircle} />
    </>
  );
};

export default Files;
