import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const Folder = ({ folder }) => {
  const router = useRouter();
  const style = {
    fontSize: "calc(2vh + 2vw)",
    color: "rgb(137, 43, 226)",
    filter: "drop-shadow(1px 1px red)",
    justifySelf: "center",
  };
  return (
    <div style={{ display: "grid", justifyContent: "center" }}>
      <FontAwesomeIcon
        style={style}
        icon={router.query.folder === folder ? faFolderOpen : faFolder}
      />
      <h5
        style={{
          margin: "0",
          textAlign: "center",
          color: "black",
          fontSize: "calc(50% + 0.5vw)",
        }}
      >
        {folder}
      </h5>
    </div>
  );
};
export default Folder;
