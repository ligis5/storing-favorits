const { db } = require("../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  const files = [];
  const snapshot = await db
    .collection("users")
    .doc(req.query.id)
    .collection("folders")
    .doc(req.query.files)
    .get();
  files.push(snapshot.data());
  if (req.method === "GET") {
    res.status(200).json({ files });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
