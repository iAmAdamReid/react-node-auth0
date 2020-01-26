import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { json, urlencoded } from "body-parser";
import { checkJwt } from "./middleware";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true, limit: "5kb" }));
app.use(json({ limit: "5kb" }));
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/private", checkJwt, (req, res) => {
  try {
    return res.status(200).json({ message: `Authorization valid.` });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: `Unauthorized.` });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Application listening on port ${process.env.PORT}.`)
);
