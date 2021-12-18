import {
  faFolderPlus,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Folder = () => {
  const style = {
    fontSize: "calc(2vh + 2vw)",
    color: "rgb(137, 43, 226)",
    filter: "drop-shadow(1px 1px red)",
  };

  return (
    <>
      <FontAwesomeIcon style={style} icon={faFolderOpen} />
      <FontAwesomeIcon style={style} icon={faFolderPlus} />
    </>
  );
};
export default Folder;
