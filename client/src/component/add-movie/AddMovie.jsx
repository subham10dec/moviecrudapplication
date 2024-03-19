import React from "react";
import AddForm from "../add-form/AddForm";
import axios from "axios";
import { API_URL } from "../../utils/constant";

const AddMovie = ({ updtaeRefresh }) => {
  const handleAdd = async (dataval) => {
    try {
      await axios.post(`${API_URL}/movies`, dataval);
      await updtaeRefresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-center">Add Movie </h1>
      <AddForm handleFormSubmit={handleAdd} />
    </div>
  );
};

export default AddMovie;
