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
  return getAuth().verifyIdToken(req.authToken);
};
