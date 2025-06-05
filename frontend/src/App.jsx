import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import AddPerson from "./pages/AddPerson";
import Fav from "./pages/Fav";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute><ProfilePage /></PrivateRoute>
        } />
        <Route path="/add" element={
          <PrivateRoute><AddPerson /></PrivateRoute>
        } />
        <Route path="/favourites" element={
          <PrivateRoute><Fav /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
