const { db } = require("../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const user = await checkToken(req);
      const userId = user.uid;

      try {
        const { folder } = req.body;

        const ref = await db
          .collection("users")
          .doc(userId)
          .collection("folders")
          .doc(folder);
        ref.set({ name: folder, id: ref.id });
        res.status(200).json({ name: folder, id: ref.id });
      } catch (error) {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
