const { db } = require("../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "POST") {
    res.status(200).json(req.body);

    await db
      .collection("users")
      .doc(req.query.userId)
      .collection("folders")
      .doc(req.body.folder)
      .set({ exists: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
