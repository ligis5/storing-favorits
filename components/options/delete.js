export const sendDelete = async (path, id) => {
  const res = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(id),
  });
  if (!res.ok) {
    console.log(res.statusText);
    return;
  }

  if (res.ok) return res.status;
};
