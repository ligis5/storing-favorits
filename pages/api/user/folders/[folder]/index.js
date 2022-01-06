const {
  db,
} = require("../../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../../components/firebase/authenticateServerSide");

export const getFiles = async (req, res, fName) => {
  const files = [];
  try {
    // check users token
    const user = await checkToken(req, res);
    const userId = user.uid;

    try {
      const snapshot = await db
        .collection("users")
        .doc(userId)
        .collection("folders")
        .doc(fName)
        .collection("websites")
        .get();
      snapshot.forEach((doc) => {
        const d = { ...doc.data(), id: doc.id };

        files.push({ files: d });
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
  return files;
};
