const { db } = require("../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "GET") {
    const userIdCookie = req.cookies.token;
    const userIdToken = req.headers.authorization.split(" ")[1];
    if (userIdCookie === userIdToken) {
      try {
        const snapshot = await db
          .collection("users")
          .doc(userIdCookie)
          .collection("folders")
          .get();

        let folders = [];
        snapshot.forEach((folder) => {
          folders.push(folder.data());
        });
        res.status(200).json({ folders });
      } catch (error) {
        res.status(404).json({ message: "Data not found" });
      }
    } else {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
