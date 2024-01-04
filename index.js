const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
// const cookieParser = require("cookie-parser");
// const { restrictToLoggedInUserOnly } = require("./middleware/auth");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/trim-url").then(() =>
  console.log("mongo connected")
);

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

app.listen(PORT, () => {
  console.log(`server started on Port:${PORT}`);
});

app.use(express.json());
// app.use(cookieParser);

// app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/url", urlRoute);
app.use("/user", userRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedhistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
