import { Link } from "react-router-dom";
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

function Dashboard() {
  return (
    <div className="container">
      <header className="header">
        <nav><button className="logout">log out</button></nav>
      </header>

      <aside className="sidebar">
        <div className="logo">logo</div>
        <Link to="/" className="button">Main Page</Link>
        <Link to="/profile" className="button">Account</Link>
        <button className="button">Add Person</button>
        <button className="button">Favourites</button>
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
    </div>
  );
}

export default Dashboard;
