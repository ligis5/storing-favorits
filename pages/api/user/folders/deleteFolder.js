const { db } = require("../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const user = await checkToken(req);
      const userId = user.uid;
      try {
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
          .doc(userId)
          .collection("folders")
          .doc(req.body)
          .delete();

        res.status(200).json({
          status: "OK",
        });
      } catch (error) {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
