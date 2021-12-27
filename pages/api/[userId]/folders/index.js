const { db } = require("../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "GET") {
    const snapshot = await db
      .collection("users")
      .doc(req.query.userId)
      .collection("folders")
      .listDocuments();
    const folders = snapshot.map((folder) => folder.id);
    res.status(200).json({ folders });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
