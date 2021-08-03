import express from "express"
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send(`hello `);
  res.end();
});

app.listen(PORT, () => {
  console.log(`> Express api running on port ${PORT}`);
});
