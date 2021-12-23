import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cat, User } from "../types";
import { getCats } from "../api";

export default function CatList({ user }: { user: User }) {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    getCats().then(setCats).catch(console.error);
  }, []);

  return (
    <>
      <h3>Hello, {user.name}</h3>
      <div>Your cats:</div>
      {cats.length ? (
        <ul className="list">
          {cats.map((cat) => (
            <Link key={cat.name} to={`/cat/${cat.id}`}>
              <li className="list-item">{cat.name}</li>
            </Link>
          ))}
        </ul>
      ) : (
        <div>No cats here yet</div>
      )}
      <Link to="/cat/new">➕ Add a new cat</Link>
    </>
  );
}
