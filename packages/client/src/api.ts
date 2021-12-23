import { CatFormData, User } from "./types";
import { GoogleLoginResponse } from "react-google-login";

function handleError(err: any) {
  console.error(err);
}

export function getUserInfo() {
  return fetch("/me").then((resp) => {
    if (resp.ok) {
      return resp.json() as Promise<User>;
    }
  });
}

export async function loginGoogle(resp: GoogleLoginResponse) {
  const userResp = await fetch("/login/google", {
    method: "POST",
    body: JSON.stringify({ token: resp.tokenId }),
    headers: { "Content-Type": "application/json" },
  });
  if (userResp.ok) {
    return userResp.json() as Promise<User>;
  }
}

export function getCats() {
  return fetch("/api/cats").then((resp) => resp.json());
}

export function getCat(id: string) {
  return fetch(`/api/cats/${id}`).then((resp) => resp.json());
}

export function createCat(catData: CatFormData) {
  return fetch("/api/cats", {
    method: "POST",
    body: JSON.stringify(catData),
    headers: { "Content-Type": "application/json" },
  });
}

export function updateCat(id: string, catData: CatFormData) {
  return fetch(`/api/cats/${id}`, {
    method: "PATCH",
    body: JSON.stringify(catData),
    headers: { "Content-Type": "application/json" },
  });
}

export function deleteCat(id: string) {
  return fetch(`/api/cats/${id}`, {
    method: "DELETE",
  });
}
