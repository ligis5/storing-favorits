import Folder from "./folder";
import Link from "next/link";
import AddFolder from "./addFolder";
import { useAuth } from "./firebase/authenticate";

const Folders = ({ foldersData }) => {
  const { user } = useAuth();
  return (
    <>
      {foldersData.folders.map((folder) => {
        return (
          <Link key={folder} href={`/${user.uid}/${folder}`}>
            <a>
              <Folder folder={folder} key={folder} />
            </a>
          </Link>
        );
      })}
      <AddFolder />
    </>
  );
};
export default Folders;
