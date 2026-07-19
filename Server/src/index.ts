import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbconnect from "./database/dbconnect.ts";

dotenv.config({
  path: "./.env",
});

const app = express();

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
    });
  })
  .catch((Error) => {
    console.log("Mongo Connect Error:", Error);
  });

// Routes Import
import userRouter from "./routes/user.route.ts";

app.use("/api/v1/user", userRouter);

export { app };
