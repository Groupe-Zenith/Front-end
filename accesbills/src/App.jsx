import { BrowserRouter as Router} from "react-router-dom";
import "./App.scss";
import RoutesApplication from "./config/mainRoutes";


function App() {
  return (
    <Router>
      <RoutesApplication />
    </Router>
    
  );
}

export default App;
