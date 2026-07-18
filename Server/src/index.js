import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbconnect from "./database/dbconnect.js";

dotenv.config({
  path: "./.env",
});

const app = new express();
const PORT = process.env.PORT;

const allowedOrigin = process.env.ORIGIN;

app.use(
  cors({
    origin: allowedOrigin, // only accepted one url of frontend so change in production.
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

dbconnect()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server is listening on http://localhost:${process.env.PORT}`,
      );
      app.on(Error, (Error) => {
        console.log("Mongo DB Error:", Error);
      });
    });
  })
  .catch((Error) => {
    console.log("Mongo Connect Error:", Error);
  });

export { app };
