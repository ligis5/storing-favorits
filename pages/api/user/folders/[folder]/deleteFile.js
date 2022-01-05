const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const userToken = await checkToken(req, res);
      const userId = userToken.uid;

      const title = req.body;

      // delete field in firestore.
      try {
        await db
          .collection("users")
          .doc(userId)
          .collection("folders")
          .doc(req.query.folder)
          .collection("websites")
          .doc(title)
          .delete();
        res.status(200).json({
          status: "OK",
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
