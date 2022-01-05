const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "PUT") {
    try {
      const userToken = await checkToken(req, res);
      const userId = userToken.uid;
      // delete field in firestore.
      await db
        .collection("users")
        .doc(userId)
        .collection("folders")
        .doc(req.query.folder)
        .collection("websites")
        .doc(req.body.oldTitle)
        .update({ title: req.body.newTitle });
      res.status(200).json({
        status: "OK",
      });
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
