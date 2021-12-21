const { db } = require("../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  const folders = [];
  const snapshot = await db
    .collection("users")
    .doc(req.query.id)
    .collection("folders")
    .get();
  snapshot.forEach((doc) => {
    folders.push({ [doc.id]: doc.data() });
  });
  if (req.method === "GET") {
    res.status(200).json({ folders });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
