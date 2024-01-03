const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitedhistory: [],
  });
  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortid = req.params.shortId;
  const data = await URL.findOne(shortid);
  return res.json({
    vists: data.visitedhistory.length,
    analytics: data.visitedhistory,
  });
}

module.exports = { handleGenerateShortURL, handleGetAnalytics };
