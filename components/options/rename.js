import { useEffect } from "react";
import { url } from "../../url";
import { useAuth } from "../firebase/authenticate";
import { useRouter } from "next/router";

const Rename = ({ changeTitle }) => {
  return (
    <div onClick={changeTitle} style={{ cursor: "pointer" }}>
      <h6 style={{ color: "white", margin: "5px" }}>rename</h6>
    </div>
  );
};

export default Rename;
