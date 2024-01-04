// const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
// const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.json({ message: "User created" });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.json({ message: "invalid email or password" });
//   const sessionId = uuidv4();
//   setUser(sessionId, user);
//   res.cookie("uid", sessionId);
  return res.json({ message: "User logged in" });
}

module.exports = { handleUserSignUp, handleUserLogin };
