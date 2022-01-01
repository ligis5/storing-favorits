import { url } from "../../url";
import { useAuth } from "../firebase/authenticate";
import { useRouter } from "next/router";

const DeleteFile = ({ title, closeOptions }) => {
  const { user } = useAuth();
  const route = useRouter();

  const sendDelete = async () => {
    const res = await fetch(
      `${url}/api/${user.uid}/folders/${route.query.folder}/deleteFile`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(title),
      }
    );
    if (!res.ok) {
      console.log(res.statusText);
    }
    closeOptions();
  };

  return (
    <div style={{ cursor: "pointer" }} onClick={sendDelete}>
      <h6 style={{ color: "white", margin: "5px" }}>remove</h6>
    </div>
  );
};

export default DeleteFile;
