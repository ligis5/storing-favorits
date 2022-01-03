const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "POST") {
    const link = req.body.file;
    // give url of website and get name of it.
    const getTitle = (url) => {
      const urlSlash = url.split("/");
      const urlDot = urlSlash[2].split(".");
      const finalTitle = urlDot[0] === "www" ? urlDot[1] : urlDot[0];

      return finalTitle;
    };
    const title = getTitle(link);
    const doc = { url: req.body.file, title };
    // post data to firestore, merge true so fields would not be overwritten.
    try {
      await db
        .collection("users")
        .doc(req.query.userId)
        .collection("folders")
        .doc(req.body.id)
        .collection("websites")
        .doc(doc.title)
        .set(doc);
      res.status(200).json(doc);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
