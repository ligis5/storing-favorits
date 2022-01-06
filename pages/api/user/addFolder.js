const { db } = require("../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "POST") {
    const userIdCookie = req.cookies.token;
    const userIdToken = req.headers.authorization.split(" ")[1];
    if (userIdCookie === userIdToken) {
      const { folder } = req.body;
      try {
        const ref = await db
          .collection("users")
          .doc(userIdCookie)
          .collection("folders")
          .doc();
        ref.set({ name: folder, id: ref.id });
        res.status(200).json({ name: folder, id: ref.id });
      } catch (error) {
        res.status(404).json({ message: "Data not found" });
      }
    } else {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
