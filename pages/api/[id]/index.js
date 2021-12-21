const { db } = require("../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  const allData = [];
  const snapshot = await db.collection("users").get();
  snapshot.forEach((doc) => {
    allData.push(doc.data());
  });
  if (req.method === "GET") {
    res.status(200).json({ allData });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
