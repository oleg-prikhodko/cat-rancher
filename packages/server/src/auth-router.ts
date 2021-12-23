import express from "express";
import { getUserById, loginUserViaGoogle } from "./auth-service";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

const router = express.Router();

router.get("/me", (req, res) => {
  let user;
  if (req.session.userId && (user = getUserById(req.session.userId))) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.post("/login/google", async (req, res) => {
  const { token } = req.body;
  const user = await loginUserViaGoogle(token);
  if (user) {
    req.session.userId = user.id;
    res.json(user);
  } else {
    res.status(400).end();
  }
});

router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
});

export default router;
