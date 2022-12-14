import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/Navbar";
import "./navbar.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPage from "./components/SearchPage";

function App() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(async () => {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/profile/",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk5YmUwZDU0ZjRhYTAwMTUxOTMwMzkiLCJpYXQiOjE2NzEwMjAwNDUsImV4cCI6MTY3MjIyOTY0NX0.3XuEFOEGaNXNTq32t5nPT9qEUWuQJirhYW-2WA-luyQ`,
        },
      }
    );
    if (response.ok)
    {
      const data = await response.json()
      dispatch({
        type: "ADD_USERS",
        payload: data
      })
    }
  }, []);
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/in/:user_id" element={<ProfilePage />} />
        <Route path="/search/:search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
