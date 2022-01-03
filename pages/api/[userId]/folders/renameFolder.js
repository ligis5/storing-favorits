const { db } = require("../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "PUT") {
    const { newTitle, id } = req.body;
    try {
      await db
        .collection("users")
        .doc(req.query.userId)
        .collection("folders")
        .doc(id)
        .set({ name: newTitle }, { merge: true });
      res.status(200).json(newTitle);
    } catch (err) {
      res.status(405).json({ err });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
