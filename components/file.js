import { faFileImage, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Options from "./options/options";
import Image from "next/image";
import { url } from "../url";
import { useAuth } from "./firebase/authenticate";
import { useData } from "./getData";
import { useRouter } from "next/router";

// single file
const File = ({ file, name, id }) => {
  const { token } = useAuth();
  const { currentFolder } = useData();
  const route = useRouter();
  const [image, setImage] = useState();
  const [openOptions, setOpenOptions] = useState(false);
  const [newTitle, setNewTitle] = useState(false);
  const [newTitleValue, setNewTitleValue] = useState("");

  const openClose = () => {
    setOpenOptions(openOptions ? false : true);
  };
  // take website name out of url
  const getTitle = (url) => {
    const finalTitle = url.replace(/.+\/\/|www.|\+/g, "");
    return finalTitle;
  };

  // get favicon using google api
  const getImage = async () => {
    const urlName = getTitle(file);
    const urlFavicon =
      "https://www.google.com/s2/favicons?sz=64&domain=" + urlName;
    setImage(urlFavicon);
  };
  useEffect(() => {
    getImage();
  }, []);

  const sendNewTitle = async (oldTitle, newTitle) => {
    const res = await fetch(
      `${url}/api/user/folders/${currentFolder.id}/renameFile`,
      {
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ oldTitle, newTitle }),
      }
    );
    if (!res.ok) {
      console.log(res.statusText);
    } else {
      changeTitle();
      return;
    }
  };

  const style = {
    fontSize: "calc(2vh + 2vw)",
    color: "rgb(137, 43, 226)",
    filter: "drop-shadow(1px 1px red)",
  };

  // show input and close file options.
  const changeTitle = () => {
    setNewTitle(newTitle ? false : true);
    setOpenOptions(false);
  };

  const submitTitle = (e) => {
    e.preventDefault();
    sendNewTitle(name, newTitleValue);
    setNewTitleValue("");
  };

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {image ? (
        <div style={{ display: "grid", justifyContent: "center" }}>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            <div
              style={{
                width: "32px",
                height: "32px",
                justifySelf: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                borderRadius: "15%",
              }}
            >
              <Image
                alt={name}
                src={image}
                width="20"
                height="20"
                layout="fixed"
              />
            </div>
          </a>
        </div>
      ) : (
        <FontAwesomeIcon style={style} icon={faFileImage} />
      )}
      {!newTitle ? (
        <h5
          style={{
            margin: "0",
            textAlign: "center",
            color: "white",
            fontSize: "calc(50% + 0.5vw)",
          }}
        >
          {name}
        </h5>
      ) : (
        <>
          <form style={{ zIndex: "9999" }} onSubmit={submitTitle}>
            <input
              required
              min="1"
              max="20"
              type="text"
              placeholder="file name"
              value={newTitleValue}
              onChange={(e) => setNewTitleValue(e.target.value)}
              style={{ height: "10px" }}
            />
          </form>
          <div
            onClick={changeTitle}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
            }}
          ></div>
        </>
      )}

      {!openOptions ? (
        <FontAwesomeIcon
          style={{
            fontSize: "20px",
            color: "rgb(137, 43, 226)",
            filter: "drop-shadow(1px 1px red)",
            justifySelf: "center",
          }}
          icon={faEllipsisH}
          onClick={openClose}
        />
      ) : (
        <>
          <FontAwesomeIcon
            style={{
              fontSize: "20px",
              color: "rgb(137, 43, 226)",
              filter: "drop-shadow(1px 1px red)",
              justifySelf: "center",
            }}
            icon={faEllipsisH}
            onClick={openClose}
          />
          <div
            onClick={openClose}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
            }}
          ></div>
          <Options
            title={id}
            closeOptions={() => setOpenOptions(false)}
            changeTitle={changeTitle}
            path={`${url}/api/user/folders/${currentFolder.id}/deleteFile`}
          />
        </>
      )}
    </div>
  );
};

export default File;
