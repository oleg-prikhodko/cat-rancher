import React from "react";

interface CatData {
  name: string;
  size: string;
  age: string;
}

interface Props {
  onSubmit: (event: React.FormEvent) => void;
  catData: CatData;
  updateCatData: (value: CatData) => void;
}

export default function CatForm({
  onSubmit,
  catData,
  updateCatData,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={catData.name}
          onChange={(evt) =>
            updateCatData({ ...catData, name: evt.target.value })
          }
        />
      </label>
      <br />
      <label>
        Size:
        <select
          value={catData.size}
          onChange={(evt) =>
            updateCatData({ ...catData, size: evt.target.value })
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
            updateCatData({ ...catData, age: evt.target.value })
          }
        />
      </label>
      <br />
      <button type="submit">Save</button>
      {children}
    </form>
  );
}
