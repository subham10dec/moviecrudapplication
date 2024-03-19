import axios from "axios";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constant";

const MoveList = ({ movelist, updtaeRefresh }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Are you sure want to delete ?");
    if (shouldDelete) {
      try {
        await axios.delete(`${API_URL}/movies/${id}`);
        await updtaeRefresh();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {movelist && movelist.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>MovieName</th>
              <th>Release Year</th>
              <th>Director</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {movelist.map(({ _id, title, release_year, director }, index) => (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{title}</td>
                <td>{release_year}</td>
                <td>{director}</td>
                <td>
                  <Button size="sm" onClick={() => navigate(`/edit/${_id}`)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No movies Found</p>
      )}
    </>
  );
};

export default MoveList;
