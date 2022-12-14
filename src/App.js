import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/Navbar";
import "./navbar.css"

function App() {
    return (

        <BrowserRouter>
        <MyNavbar/>
            <Routes>
                <Route path="/in/:user_id" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
