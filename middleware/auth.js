const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(res, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.json({ message: "user not logged in" });
  const user = getUser(userUid);
  if (!user) return res.json({ message: "no user" });
  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUserOnly };
