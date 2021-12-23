import dotenv from "dotenv";

dotenv.config();

import express from "express";
import session from "express-session";
import sessionFileStore from "session-file-store";
import bodyParser from "body-parser";
import authRouter from "./auth-router";
import catsRouter from "./cats-router";
import path from "path";

const FileStore = sessionFileStore(session);

const app = express();
app.use(
  session({
    store: new FileStore({
      path: path.resolve(__dirname, "../", process.env.SESSION_DIR!),
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: +process.env.COOKIE_MAX_AGE! },
  })
);
app.use(bodyParser.json());
app.use(authRouter);
app.use(catsRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
