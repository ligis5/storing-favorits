import Folder from "./folder";
import Link from "next/link";
import AddFolder from "./addFolder";
import { useAuth } from "./firebase/authenticate";
import { useRouter } from "next/router";

//contains all the folders
const Folders = ({ foldersData }) => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      {foldersData.folders.map((folder) => {
        return (
          <Link
            key={folder}
            href={
              router.pathname === "/[userId]/folders"
                ? `/${user.uid}/folders/${folder}`
                : `/${user.uid}/${folder}`
            }
          >
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
