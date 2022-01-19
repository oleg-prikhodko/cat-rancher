import { useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { getCatsThunk, selectCats } from "../catSlice";

export default function CatList({ user }: { user: User }) {
  const dispatch = useDispatch();
  const cats = useSelector(selectCats);

  useEffect(() => {
    dispatch(getCatsThunk());
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
