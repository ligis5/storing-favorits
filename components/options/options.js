import Delete from "./delete";
import Rename from "./rename";

const Options = ({ title, changeTitle, closeOptions, path, id }) => {
  return (
    <div className="options">
      <Delete title={title} closeOptions={closeOptions} path={path} id={id} />
      <Rename changeTitle={changeTitle} />
    </div>
  );
};

export default Options;
