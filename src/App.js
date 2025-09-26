import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DanfooBooking from "./components/Dashboard";
import Login from "./components/Login";
import "./styles/DanfooBooking.css";
import "./styles/App.css";

function App() {
  return (
    <Router className="App">
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DanfooBooking />} />
      </Routes>

    </Router>
  );
}
export default App;
