import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { deleteCat, getCat, updateCat } from "../api";

const initialData = { name: "", size: "", age: "" };

export default function CatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cat, setCat] = useState(initialData);

  useEffect(() => {
    if (id) {
      getCat(id).then(setCat).catch(console.error);
    }
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateCat(id!, cat)
      .then((resp) => {
        if (resp.ok) {
          navigate("/");
        }
      })
      .catch(console.error);
  };

  const handleDelete = () => {
    deleteCat(id!)
      .then((resp) => {
        if (resp.ok) {
          navigate("/");
        }
      })
      .catch(console.error);
  };

  if (!cat) return null;
  return (
    <>
      <h3>Edit cat</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={cat.name}
            onChange={(evt) =>
              setCat((cat) => ({ ...cat, name: evt.target.value }))
            }
          />
        </label>
        <br />
        <label>
          Size:
          <select
            value={cat.size}
            onChange={(evt) =>
              setCat((cat) => ({ ...cat, size: evt.target.value }))
            }
          >
            <option value="" disabled>
              -- Select size --
            </option>
            <option value="small">Small</option>
            <option value="regular">Regular</option>
            <option value="large">Large</option>
          </select>
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={cat.age}
            onChange={(evt) =>
              setCat((cat) => ({ ...cat, age: evt.target.value }))
            }
          />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </>
  );
}
