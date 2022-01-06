const { db } = require("../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "PUT") {
    const { newTitle, id } = req.body;
    const userIdCookie = req.cookies.token;
    const userIdToken = req.headers.authorization.split(" ")[1];
    if (userIdCookie === userIdToken) {
      try {
        await db
          .collection("users")
          .doc(userIdCookie)
          .collection("folders")
          .doc(id)
          .set({ name: newTitle }, { merge: true });
        res.status(200).json(newTitle);
      } catch (error) {
        res.status(404).json({ message: "Data not found" });
      }
    } else {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
