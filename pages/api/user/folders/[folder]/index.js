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
        .orderBy("clicks", "desc")
        .get();
      snapshot.forEach((doc) => {
        const file = { ...doc.data() };

        files.push(file);
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
  return files;
};
