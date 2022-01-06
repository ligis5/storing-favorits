const cookie = require("cookie");

export default async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", req.headers.authorization.split(" ")[1], {
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
