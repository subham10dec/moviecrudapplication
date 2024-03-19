import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MoveList from "./component/movie-list/MoveList";
import Header from "./component/header/Header";
import axios from "axios";
import { API_URL } from "./utils/constant";
import AddMovie from "./component/add-movie/AddMovie";
import EditMovie from "./component/edit-movie/EditMovie";
import Login from "./component/login/Login";
import ProtectedRoute from "./component/protected-routes/ProtectedRoute";
import useLocalStorage from "./custom-hooks/useLocalStorage";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/movies`);
        setMovies(data);
      } catch (err) {
        console.log(err);
        setErrormsg(err.response?.data || "Error while getting list of data");
      }
    };
    getMovies();
  }, [refresh]);
  const updtaeRefresh = () => {
    setRefresh((refresh) => !refresh);
  };
  const updateLoginStatus = async () => {
    setIsLoggedIn((prev) => !prev);
  };
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} updateLoginStatus={updateLoginStatus} />
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/list" />
              ) : (
                <Login
                  updateLoginStatus={updateLoginStatus}
                  updtaeRefresh={updtaeRefresh}
                />
              )
            }
          />
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route
              path="/list"
              element={
                <MoveList movelist={movies} updtaeRefresh={updtaeRefresh} />
              }
            />
            <Route
              path="/add"
              element={<AddMovie updtaeRefresh={updtaeRefresh} />}
            />
            <Route
              path="/edit/:id"
              element={<EditMovie updtaeRefresh={updtaeRefresh} />}
            />
          </Route>

          <Route path="*" element={<Navigate to="/list" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
