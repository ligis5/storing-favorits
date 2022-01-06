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
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState({});
  const [currentFolder, setCurrentFolder] = useState();

  // add fodler to current folders array
  const addFolder = (f) => {
    return setFolders([...folders, f]);
  };
  // add file to current files array
  const addFiles = (f) => {
    const addedFile = {
      [folderName]: [...files[folderName], { [f.title]: f }],
    };
    return setFiles({ ...files, ...addedFile });
  };

  const renameFolder = (id, newName) => {
    if (folders) {
      const f = folders.map((folder) => {
        if (folder.id === id) {
          folder.name = newName;
        }
        return folder;
      });
      setFolders(f);
    }
  };

  const whatFolderIamIn = () => {
    const folder = folders
      ? folders.filter((f) => f.name === folderName)
      : null;
    setCurrentFolder(folder[0]);
  };

  const deleteFolder = async (f) => {
    const filteredFolders = folders
      ? folders.filter((folder) => folder.name != f)
      : null;
    setFolders(filteredFolders);
  };

  useEffect(() => {
    if (user && folders) {
      whatFolderIamIn();
    }
  }, [folderName, folders]);

  const data = {
    folders,
    addFiles,
    addFolder,
    renameFolder,
    currentFolder,
    deleteFolder,
  };
  return <CreateData.Provider value={data}>{children}</CreateData.Provider>;
};

export default DataProvider;
