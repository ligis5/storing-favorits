const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");

export default async (req, res) => {
  if (req.method === "POST") {
    const userIdCookie = req.cookies.token;
    const userIdToken = req.headers.authorization.split(" ")[1];

    if (userIdCookie === userIdToken) {
      try {
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
        await db
          .collection("users")
          .doc(userIdCookie)
          .collection("folders")
          .doc(req.body.id)
          .collection("websites")
          .doc(doc.title)
          .set(doc);

        res.status(200).json(doc);
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
