const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const user = await checkToken(req);
      const userId = user.uid;
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
        const timeAdded = Date.now();
        const file = { url: req.body.file, title, timeAdded, clicks: 0 };
        // post data to firestore, merge true so fields would not be overwritten.
        await db
          .collection("users")
          .doc(userId)
          .collection("folders")
          .doc(req.body.id)
          .collection("websites")
          .doc(file.title)
          .set(file);

        res.status(200).json(file);
      } catch (error) {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      res.status(403).json({ message: "No access" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
