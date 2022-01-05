const { db } = require("../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const userToken = await checkToken(req, res);
      const userId = userToken.uid;

      const doc = await db.collection("users").doc(userId).get();

      const userData = doc.data();
      res.status(200).json(userData);
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
