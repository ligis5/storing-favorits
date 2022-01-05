const { db } = require("../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "PUT") {
    const { newTitle, id } = req.body;
    try {
      const userToken = await checkToken(req, res);
      const userId = userToken.uid;

      await db
        .collection("users")
        .doc(userId)
        .collection("folders")
        .doc(id)
        .set({ name: newTitle }, { merge: true });
      res.status(200).json(newTitle);
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
