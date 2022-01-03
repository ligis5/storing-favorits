import { useRouter } from "next/router";
import { useData } from "../getData";
const Delete = ({ title, closeOptions, path, id }) => {
  const router = useRouter();
  const { deleteFolder } = useData();

  const sendDelete = async () => {
    const res = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: !id ? JSON.stringify(title) : JSON.stringify(id),
    });
    if (!res.ok) {
      console.log(res.statusText);
    }
    closeOptions();
    // if id means if deleting folder return to previous page.
    if (res.ok && id) {
      deleteFolder(title);
      router.push(router.asPath.replace(router.query.folder, ""));
    }
  };

  return (
    <div style={{ cursor: "pointer" }} onClick={sendDelete}>
      <h6 style={{ color: "white", margin: "5px" }}>remove</h6>
    </div>
  );
};

export default Delete;
