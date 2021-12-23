import express from "express";
import {
  createCat,
  deleteCat,
  getCat,
  getCats,
  updateCat,
} from "./cats-service";
import { authMiddleware } from "./auth-middleware";

const router = express.Router();

router.all("*", authMiddleware);

router.get("/api/cats", (req, res) => {
  const cats = getCats(req.session.userId!);
  res.json(cats);
});

router.post("/api/cats", (req, res) => {
  if (req.body && validateCatData(req.body)) {
    createCat(req.session.userId!, req.body);
    res.end();
  } else {
    res.status(400).end();
  }
});

router.get("/api/cats/:id", (req, res) => {
  const cat = getCat(req.params.id);
  if (!cat) {
    res.status(404).end();
  } else if (cat.owner !== req.session.userId) {
    res.status(403).end();
  } else {
    res.json(cat);
  }
});

router.patch("/api/cats/:id", (req, res) => {
  if (!req.body || !validateCatData(req.body)) {
    res.status(400).end();
    return;
  }
  const cat = getCat(req.params.id);
  if (!cat) {
    res.status(404).end();
  } else if (cat.owner !== req.session.userId) {
    res.status(403).end();
  } else {
    updateCat(req.params.id, req.body);
    res.end();
  }
});

router.delete("/api/cats/:id", (req, res) => {
  const cat = getCat(req.params.id);
  if (!cat) {
    res.status(404).end();
  } else if (cat.owner !== req.session.userId) {
    res.status(403).end();
  } else {
    deleteCat(req.params.id);
    res.end();
  }
});

function validateCatData(catData: Record<string, any>) {
  const sizes = ["small", "regular", "large"];
  const age = +catData.age;
  return (
    typeof catData.name === "string" &&
    /^\w+$/.test(catData.name) &&
    sizes.includes(catData.size) &&
    age > 0 &&
    age < 30
  );
}

export default router;
