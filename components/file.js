import { faFileImage, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import FileOptions from "./fileOptions";
import Image from "next/image";
import Link from "next/link";

// single file
const File = ({ file, name }) => {
  const [image, setImage] = useState();
  const [openOptions, setOpenOptions] = useState(false);

  const openClose = () => {
    setOpenOptions(openOptions ? false : true);
  };

  // get favicon using google api
  const getImage = async () => {
    const urlFavicon =
      "https://www.google.com/s2/favicons?sz=64&domain=" + name;
    setImage(urlFavicon);
  };
  useEffect(() => {
    getImage();
  }, []);

  const style = {
    fontSize: "calc(2vh + 2vw)",
    color: "rgb(137, 43, 226)",
    filter: "drop-shadow(1px 1px red)",
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
        <div style={{ display: "grid" }}>
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
            className="close"
            onClick={openClose}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
            }}
          ></div>
          <FileOptions title={name} />
        </>
      )}
    </div>
  );
};

export default File;
