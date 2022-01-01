import { useContext, createContext, useState, useEffect } from "react";
import { url } from "../url";
import { useAuth } from "./firebase/authenticate";
import { useRouter } from "next/router";

const CreateData = createContext();

export const useData = () => {
  return useContext(CreateData);
};

const DataProvider = ({ children }) => {
  const router = useRouter();
  const folderName = router.query.folder;
  const { user } = useAuth();
  const [folders, setFolders] = useState();
  const [files, setFiles] = useState({});

  const fetchFolders = async () => {
    const res = await fetch(`${url}/api/${user.uid}/folders`);
    const foldersRes = await res.json();
    if (res.ok) {
      setFolders(foldersRes);
    }
  };
  const fetchFiles = async () => {
    // if folder was already fetched return true.
    const ex = files
      ? Object.keys(files).filter((file) => file === folderName).length > 0
        ? true
        : false
      : false;
    // fetch only if it was not fetched yet.
    if (!ex) {
      const res = await fetch(`${url}/api/${user.uid}/folders/${folderName}`);
      const filesData = await res.json();
      if (res.ok) {
        setFiles({ ...files, [folderName]: filesData });
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [folderName, user]);

  useEffect(() => {
    if (user) {
      fetchFolders();
    }
    return () => {
      setFolders();
    };
  }, [user]);

  const data = {
    folders,
    files,
  };
  return <CreateData.Provider value={data}>{children}</CreateData.Provider>;
};

export default DataProvider;
