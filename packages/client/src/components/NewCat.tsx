import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createCatThunk } from "../catSlice";

const initialData = { name: "", size: "", age: "" };

export default function NewCat() {
  const [catData, setCatData] = useState(initialData);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createCatThunk(catData)).then((result) => {
      if ("error" in result) return;
      navigate("/");
    });
  };

  return (
    <>
      <h3>New cat</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={catData.name}
            onChange={(evt) =>
              setCatData((cat) => ({ ...cat, name: evt.target.value }))
            }
          />
        </label>
        <br />
        <label>
          Size:
          <select
            value={catData.size}
            onChange={(evt) =>
              setCatData((cat) => ({ ...cat, size: evt.target.value }))
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
            value={catData.age}
            onChange={(evt) =>
              setCatData((cat) => ({ ...cat, age: evt.target.value }))
            }
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
