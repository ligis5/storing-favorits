const { getAuth } = require("firebase-admin/auth");

export const checkToken = (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  let uid;
  getAuth()
    .verifyIdToken(req.authToken)
    .then((decodedToken) => {
      uid = decodedToken.uid;
    })
    .catch((error) => {
      console.log(error);
    });
  return uid;
};
