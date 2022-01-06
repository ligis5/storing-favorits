import Folder from "./folder";
import AddFolder from "./addFolder";
import { useData } from "./getData";

//contains all the folders
const Folders = ({ data }) => {
  return (
    <>
      {data ? (
        data.map((folder) => {
          return <Folder folder={folder.name} key={folder.id} id={folder.id} />;
        })
      ) : (
        <></>
      )}
      <AddFolder />
    </>
  );
};
export default Folders;
