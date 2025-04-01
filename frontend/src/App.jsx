import { useState } from 'react';
import "./App.css";

const users = [
  { name: "ala", img: "https://via.placeholder.com/100" },
  { name: "Dominika", img: "https://via.placeholder.com/100" },
  { name: "mama", img: "https://via.placeholder.com/100" },
  { name: "Piotrek", img: "https://via.placeholder.com/100" },
  { name: "dawid", img: "https://via.placeholder.com/100" },
  { name: "Veska", img: "https://via.placeholder.com/100" },
  { name: "ciocia Ela", img: "https://via.placeholder.com/100" },
  { name: "Krystian", img: "https://via.placeholder.com/100" },
];

function App() {
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">logo</div>
        <button className="button">main page</button>
        <button className="button">account</button>
        <button className="button">add person</button>
        <button className="button">favourites</button>
      </aside>
      <main className="content">
        <div className="search-bar">
          <input type="text" placeholder="search..." />
          <button>🔍</button>
        </div>
        <div className="grid">
          {users.map((user, index) => (
            <div key={index} className="card">
              <img src={user.img} alt={user.name} className="profile-img" />
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </main>
      <button className="logout">log out</button>
    </div>
  );
}

export default App;