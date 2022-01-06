const { db } = require("../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "PUT") {
    try {
      const user = await checkToken(req);
      const userId = user.uid;
      try {
        const { newTitle, id } = req.body;
        await db
          .collection("users")
          .doc(userId)
          .collection("folders")
          .doc(id)
          .set({ name: newTitle }, { merge: true });
        res.status(200).json(newTitle);
      } catch (error) {
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
