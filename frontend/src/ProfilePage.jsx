import React from "react";
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profile-container">
      <aside className="sidebar">
        <div className="logo">logo</div>
        <button className="button">main page</button>
        <button className="button">account</button>
        <button className="button">add person</button>
        <button className="button">favourites</button>
      </aside>

      <main className="profile-content">
        <div className="profile-card">
          <div className="profile-image"></div>
          <p>You are with us since dd - mm - yyyy!</p>
          <p>Thank you !!!!</p>
        </div>
      </main>

      <button className="logout">log out</button>
    </div>
  );
}

export default ProfilePage;
