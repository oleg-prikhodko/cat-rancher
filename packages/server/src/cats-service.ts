import { db } from "./db";

export function getCats(userId: string | number) {
  return db.prepare("SELECT * FROM cats WHERE owner = ?").all(userId);
}

export function getCat(catId: string | number) {
  return db.prepare("SELECT * FROM cats WHERE id = ?").get(catId);
}

export function createCat(
  userId: string | number,
  catData: { name: string; size: string; age: number }
) {
  return db
    .prepare("INSERT INTO cats (name, size, age, owner) VALUES (?, ?, ?, ?)")
    .run(catData.name, catData.size, catData.age, userId);
}

export function updateCat(
  catId: string | number,
  catData: { name: string; size: string; age: number }
) {
  return db
    .prepare("UPDATE cats SET name=?, size=?, age=? WHERE id = ?")
    .run(catData.name, catData.size, catData.age, catId);
}

export function deleteCat(catId: string | number) {
  return db.prepare("DELETE FROM cats WHERE id = ?").run(catId);
}
