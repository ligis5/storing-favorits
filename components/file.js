import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import Image from "next/image";

// single file
const File = ({ file }) => {
  const [image, setImage] = useState();

  const getImage = async () => {
    // get website name between  dots www."example".com
    const splitUrl = file.split(".");
    // get .com/random and split it where / is and only use part up to /
    const secondSplit = splitUrl[2].split("/");
    const urlRecombined =
      "https://www.google.com/s2/favicons?sz=64&domain=" +
      splitUrl[1] +
      "." +
      secondSplit[0];
    setImage(urlRecombined);
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
    <>
      {image ? (
        <Image src={image} width="32" height="32" />
      ) : (
        <FontAwesomeIcon style={style} icon={faFileImage} />
      )}
    </>
  );
};

export default File;
