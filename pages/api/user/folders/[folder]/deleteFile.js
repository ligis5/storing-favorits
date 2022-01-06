const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "DELETE") {
    const userIdCookie = req.cookies.token;
    const userIdToken = req.headers.authorization.split(" ")[1];

    if (userIdCookie === userIdToken) {
      try {
        const title = req.body;
        // delete field in firestore.
        await db
          .collection("users")
          .doc(userIdCookie)
          .collection("folders")
          .doc(req.query.folder)
          .collection("websites")
          .doc(title)
          .delete();
        res.status(200).json({
          status: "OK",
        });
      } catch (error) {
        res.status(404).json({ message: "Data not found" });
      }
    } else {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
