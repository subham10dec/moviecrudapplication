import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { API_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const AddForm = ({ handleFormSubmit, movie }) => {
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { _id, title, release_year, director } = movie || {};
  useEffect(() => {
    reset({
      title,
      release_year,
      director,
    });
  }, [_id]);

  const onSubmitForm = async (dataval) => {
    if (movie) {
      try {
        await handleFormSubmit({
          id: _id,
          data: dataval,
        });
        setSuccessMsg("Movie Updated Successfully");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await handleFormSubmit(dataval);
        setSuccessMsg("Movie Added Successfully");
        setTimeout(() => {
          setSuccessMsg("");
          reset();
          navigate("/");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="add-form">
      {" "}
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        {successMsg && <p className="success-msg">{successMsg}</p>}
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            {...register("title", {
              required: "This is required field",
            })}
          />
          {errors.title && <p className="error-msg">{errors.title.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="release_year">
          <Form.Label>Release Year</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Release Year"
            {...register("release_year", {
              required: "This is required field",
            })}
          />
          {errors.release_year && (
            <p className="error-msg">{errors.release_year.message}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="director">
          <Form.Label>Director</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Director"
            {...register("director", {
              required: "This is required field",
            })}
          />
          {errors.director && (
            <p className="error-msg">{errors.director.message}</p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          {movie ? "Update" : "ADD"} Movie
        </Button>
      </Form>
    </div>
  );
};

export default AddForm;
