const cookie = require("cookie");
const {
  checkToken,
} = require("../../components/firebase/authenticateServerSide");

export default async (req, res) => {
  const token = await checkToken(req, res);
  const tokenId = token.uid;

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", tokenId, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 10,
      sameSite: "strict",
      path: "/",
    })
  );
  res.status = 200;
  res.json({ success: true });
};
