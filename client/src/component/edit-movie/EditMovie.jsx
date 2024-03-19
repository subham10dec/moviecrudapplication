import React, { useEffect, useState } from "react";
import AddForm from "../add-form/AddForm";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import { useParams } from "react-router-dom";

const EditMovie = ({ updtaeRefresh }) => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getMoviedetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/movies/${id}`);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMoviedetails();
  }, [id]);
  const handleEdit = async ({ id, data }) => {
    try {
      await axios.patch(`${API_URL}/movies/${id}`, data);
      await updtaeRefresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-center">Edit Movie </h1>
      <AddForm handleFormSubmit={handleEdit} movie={movie} />
    </div>
  );
};

export default EditMovie;
