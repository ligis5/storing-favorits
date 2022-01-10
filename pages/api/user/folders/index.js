const { db } = require("../../../../components/firebase/initializeServerSide");
const {
  checkToken,
} = require("../../../../components/firebase/authenticateServerSide");

export const getFolders = async (req, res, limit) => {
  let folders = [];
  try {
    // check if user auth token exists in firebase
    const user = await checkToken(req);
    const userId = user.uid;
    //  fetch folders belonging to current user
    try {
      const snapshot = await db
        .collection("users")
        .doc(userId)
        .collection("folders")
        .orderBy("clicks", "desc")
        .limit(limit)
        .get();
      snapshot.forEach((folder) => {
        folders.push(folder.data());
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
  return folders;
};
