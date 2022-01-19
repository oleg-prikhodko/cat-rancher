import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { createCatThunk } from "../catSlice";
import CatForm from "./CatForm";

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
      <CatForm
        onSubmit={handleSubmit}
        catData={catData}
        updateCatData={setCatData}
      />
    </>
  );
}
