const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "PUT") {
    // delete field in firestore.
    await db
      .collection("users")
      .doc(req.query.userId)
      .collection("folders")
      .doc(req.query.folder)
      .collection("websites")
      .doc(req.body.oldTitle)
      .update({ title: req.body.newTitle });
    res.status(200).json({
      status: "OK",
    });
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
