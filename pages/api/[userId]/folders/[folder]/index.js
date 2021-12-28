const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "GET") {
    const snapshot = await db
      .collection("users")
      .doc(req.query.userId)
      .collection("folders")
      .doc(req.query.folder)
      .collection("websites")
      .get();

    const files = [];
    snapshot.forEach((doc) => {
      files.push({ [doc.id]: doc.data() });
    });
    res.status(200).json(files);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
