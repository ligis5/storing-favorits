import { url } from "../../url";

// id is document id, data is ether new title, or how many times was file clicked.
export const updateData = async (id, data, path) => {
  let title;
  const res = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ id, data }),
  });
  if (!res.ok) {
    console.log(res.statusText);
  } else {
    if (data.title) {
      title = data.title;
    }
  }
  return title;
};
