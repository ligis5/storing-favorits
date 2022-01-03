const { db } = require("../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "POST") {
    const { folder } = req.body;
    try {
      const ref = await db
        .collection("users")
        .doc(req.query.userId)
        .collection("folders")
        .doc();
      ref.set({ name: folder, id: ref.id });
      res.status(200).json({ name: folder, id: ref.id });
    } catch (err) {
      res.status(405).json({ err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
