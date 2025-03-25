import { BrowserRouter as Router} from "react-router-dom";
import "./App.scss";
import RoutesApplication from "./config/mainRoutes";
import LoginPage from "./pages/auth/LoginPage";
import MainUserPage from "./pages/user/mainUserPage";

function App() {
  return (
    <Router>
      <RoutesApplication />
    </Router>
  );
}

export default App;
