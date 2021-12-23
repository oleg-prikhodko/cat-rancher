import { db } from "./db";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export function getUserById(id: string | number) {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
}

export async function loginUserViaGoogle(token: string) {
  const loginTicket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const userInfo = await loginTicket.getPayload();
  if (userInfo) {
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(userInfo.email);
    if (user) {
      return user;
    } else {
      db.prepare("INSERT INTO users (email, name) VALUES (?, ?)").run(
        userInfo.email,
        userInfo.name
      );
      return db
        .prepare("SELECT * FROM users WHERE email = ?")
        .get(userInfo.email);
    }
  }
}
