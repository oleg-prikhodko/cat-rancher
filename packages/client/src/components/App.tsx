import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatList from "./CatList";
import CatPage from "./CatPage";
import Login from "./Login";
import NewCat from "./NewCat";
import { getUserInfo } from "../api";
import { User } from "../types";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUserInfo().then(setUser);
  }, []);

  return (
    <>
      <header className="header">Cat rancher 🐱</header>
      <main>
        <BrowserRouter>
          <Routes>
            {user ? (
              <>
                <Route path="/cat/new" element={<NewCat />} />
                <Route path="/cat/:id" element={<CatPage />} />
                <Route path="/" element={<CatList user={user} />} />
              </>
            ) : (
              <Route path="/" element={<Login setUser={setUser} />} />
            )}
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
