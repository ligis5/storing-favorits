const { db } = require("../../../../components/firebase/initializeServerSide");
import { checkToken } from "../../../../components/firebase/authenticateServerSide";

export default async (req, res) => {
  if (req.method === "GET") {
    const userId = checkToken(req, res);
    console.log(userId);
    const snapshot = await db
      .collection("users")
      .doc(req.query.userId)
      .collection("folders")
      .get();

    let folders = [];
    snapshot.forEach((folder) => {
      folders.push(folder.data());
    });
    res.status(200).json({ folders });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
