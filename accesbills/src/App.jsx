import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import RoutesApplication from "./config/mainRoutes";
import { AudioProvider } from "./assets/sounds/AudioContext";

function App() {
  return (
    <AudioProvider>
      <Router>
        <RoutesApplication />
      </Router>
    </AudioProvider>
  );
}

export default App;
