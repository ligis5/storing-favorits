const { getAuth } = require("firebase-admin/auth");

export const checkToken = (req, res) => {
  return getAuth().verifyIdToken(req.cookies.token);
};
