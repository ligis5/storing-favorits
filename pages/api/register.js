const { db } = require("../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, username, userId } = req.body;

    const data = {
      email,
      timeCreated: new Date(),
      username,
    };
    console.log(data, userId);
    await db.collection("users").doc(userId).set(data);
    res.json({ data });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
