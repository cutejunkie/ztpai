import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="logo">logo</div>
        <Link to="/" className="button">Main Page</Link>
        <Link to="/profile" className="button">Account</Link>
        <button className="button">Add Person</button>
        <button className="button">Favourites</button>
      </aside>

      <main className="profile-content">
        <div className="profile-card">
          <div className="profile-image"></div>
          <p>You are with us since dd - mm - yyyy!</p>
          <p>Thank you !!!!</p>
        </div>
      </main>

      <button className="logout">Log out</button>
    </div>
  );
}

export default ProfilePage;
