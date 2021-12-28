import DeleteFile from "./deleteFile";

const FileOptions = ({ title }) => {
  return (
    <div className="file-options">
      <DeleteFile title={title} />
      <h6 style={{ color: "white", margin: "5px" }}>change name</h6>
      <h6 style={{ color: "white", margin: "5px" }}>change name</h6>
      <h6 style={{ color: "white", margin: "5px" }}>change name</h6>
      <h6 style={{ color: "white", margin: "5px" }}>change name</h6>
    </div>
  );
};

export default FileOptions;
