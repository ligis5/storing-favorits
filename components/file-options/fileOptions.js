import DeleteFile from "./deleteFile";
import RenameFile from "./renameFile";

const FileOptions = ({ title, changeTitle, closeOptions }) => {
  return (
    <div className="file-options">
      <DeleteFile title={title} closeOptions={closeOptions} />
      <RenameFile changeTitle={changeTitle} />
    </div>
  );
};

export default FileOptions;
