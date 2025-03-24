import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/auth/LoginPage";
import MainUserPage from "./pages/user/mainUserPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<p>Hello</p>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<MainUserPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
