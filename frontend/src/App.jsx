import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import AddPerson from "./pages/AddPerson";
import "./App.css";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add" element={<AddPerson />} />
      </Routes>
    </Router>
  );
}

export default App;
