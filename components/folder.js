import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const Folder = ({ folder }) => {
  const router = useRouter();
  const style = {
    fontSize: "calc(2vh + 2vw)",
    color: "rgb(137, 43, 226)",
    filter: "drop-shadow(1px 1px red)",
  };
  return (
    <>
      <FontAwesomeIcon
        style={style}
        icon={router.query.folder === folder ? faFolderOpen : faFolder}
      />
    </>
  );
};
export default Folder;
