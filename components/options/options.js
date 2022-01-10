import { sendDelete } from "./delete";
import Rename from "./rename";
import { useRouter } from "next/router";

const Options = ({
  changeTitle,
  closeOptions,
  path,
  id,
  removeFolder,
  removeFile,
  dataType,
}) => {
  const router = useRouter();

  // sendDelete(url to api that deletes file or folder, file or folder id)
  const deleteData = async () => {
    const response = await sendDelete(path, id);

    if (response === 200 && dataType === "folder") {
      // remove folder from current array of folders, close options and leave folder if inside
      removeFolder(id);
      closeOptions();
      router.push(router.asPath.replace(router.query.folder, ""));
      return;
    }
    if (response === 200 && dataType === "file") {
      // remove file from current files array and close options
      removeFile(id);
      closeOptions();
    }
  };
  return (
    <div className="options">
      <div style={{ cursor: "pointer" }} onClick={deleteData}>
        <h6 style={{ color: "white", margin: "5px" }}>remove</h6>
      </div>
      <Rename changeTitle={changeTitle} />
    </div>
  );
};

export default Options;
