const { db } = require("../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const userToken = await checkToken(req, res);
      const userId = userToken.uid;

      const docsRef = db
        .collection("users")
        .doc(userId)
        .collection("folders")
        .doc(req.body)
        .collection("websites");

      const snapshot = await docsRef.get().then();

      snapshot.forEach(async (doc) => {
        await docsRef.doc(doc.id).delete();
      });

      await db
        .collection("users")
        .doc(req.query.userId)
        .collection("folders")
        .doc(req.body)
        .delete();

      res.status(200).json({
        status: "OK",
      });
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
