import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(4000, () => console.log(`Application listening on port 4000.`));
