const { db } = require("../../../../components/firebase/initializeServerSide");
import { checkToken } from "../../../../components/firebase/authenticateServerSide";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const userToken = await checkToken(req, res);
      const userId = userToken.uid;
      const snapshot = await db
        .collection("users")
        .doc(userId)
        .collection("folders")
        .get();

      let folders = [];
      snapshot.forEach((folder) => {
        folders.push(folder.data());
      });
      res.status(200).json({ folders });
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
