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
  const [files, setFiles] = useState(["empty"]);

  const fetchFolders = async () => {
    const res = await fetch(`${url}/api/${user.uid}/folders`);
    const foldersRes = await res.json();
    if (res.ok) {
      setFolders(foldersRes);
    }
  };
  const fetchFiles = async () => {
    const res = await fetch(`${url}/api/${user.uid}/folders/${folderName}`);
    const filesData = await res.json();
    if (res.ok) {
      setFiles({ ...files, [folderName]: filesData });
    }
  };

  useEffect(() => {
    if (user) {
      fetchFiles();
      console.log(files);
    }
    return () => {
      setFiles();
    };
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
