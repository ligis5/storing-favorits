const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "PUT") {
    try {
      const user = await checkToken(req);
      const userId = user.uid;
      try {
        // update field in firestore document
        const { data, id } = req.body;

        await db
          .collection("users")
          .doc(userId)
          .collection("folders")
          .doc(req.query.folder)
          .collection("websites")
          .doc(id)
          .update(data);
        res.status(200).json({
          status: "OK",
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
