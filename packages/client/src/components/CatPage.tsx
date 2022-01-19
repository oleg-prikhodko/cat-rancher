import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCatThunk,
  getCatByIdThunk,
  selectCatById,
  updateCatThunk,
} from "../catSlice";
import { AppDispatch } from "../store";
import { Cat } from "../types";
import CatForm from "./CatForm";

const initialData = { name: "", size: "", age: "" };

export default function CatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cat = useSelector(selectCatById(+id!));
  const [catData, setCatData] = useState(initialData);

  useEffect(() => {
    if (id) {
      dispatch(getCatByIdThunk(id)).then((result) => {
        if ("error" in result) return;
        const cat = result.payload as Cat;
        setCatData({
          name: cat.name,
          size: cat.size,
          age: cat.age.toString(),
        });
      });
    }
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateCatThunk({ id: id!, catData })).then((result) => {
      if ("error" in result) return;
      navigate("/");
    });
  };

  const handleDelete = () => {
    dispatch(deleteCatThunk(id!)).then((result) => {
      if ("error" in result) return;
      navigate("/");
    });
  };

  if (!cat) return null;
  return (
    <>
      <h3>Edit cat</h3>
      <CatForm
        onSubmit={handleSubmit}
        catData={catData}
        updateCatData={setCatData}
      >
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </CatForm>
    </>
  );
}
