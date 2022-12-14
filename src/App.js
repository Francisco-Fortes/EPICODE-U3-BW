import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/in/:user_id" element={<ProfilePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
