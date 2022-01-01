import Folder from "./folder";
import Link from "next/link";
import AddFolder from "./addFolder";
import { useAuth } from "./firebase/authenticate";
import { useRouter } from "next/router";
import { useData } from "./getData";

//contains all the folders
const Folders = () => {
  const { folders } = useData();
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      {folders ? (
        folders.folders.map((folder) => {
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
        })
      ) : (
        <></>
      )}
      <AddFolder />
    </>
  );
};
export default Folders;
