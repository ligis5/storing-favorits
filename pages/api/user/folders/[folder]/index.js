const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const userToken = await checkToken(req, res);
      const userId = userToken.uid;

      const snapshot = await db
        .collection("users")
        .doc(userId)
        .collection("folders")
        .doc(req.query.folder)
        .collection("websites")
        .get();

      const files = [];
      snapshot.forEach((doc) => {
        const d = { ...doc.data(), id: doc.id };
        files.push({ files: d });
      });
      res.status(200).json(files);
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
