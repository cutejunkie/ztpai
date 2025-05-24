import './App.css';
// import obraz from './assets/obraz.jpg';

function Topbar() {
  return (
    <div className="Topbar">
      <button className="Topbar-button">log out</button>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="Sidebar-logo">logo</div>
      <div className="Sidebar-buttons">
        <button>main page</button>
        <button>account</button>
        <button>add person</button>
        <button>favourites</button>
      </div>
    </div>
  );
}

function PersonCard({ image, name }) {
  return (
    <div className="PersonCard">
      {image ? (
        <img src={image} alt={name} className="PersonCard-image" />
      ) : (
        <div className="PersonCard-placeholder">Brak zdjęcia</div>
      )}
      <p className="PersonCard-name">{name}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="Background">
        <div className="PersonCard-container">
        <PersonCard image="" name="Anna Kowalska" />
        <PersonCard image="" name="Jan Nowak" />
        <PersonCard image="" name="Kasia Wiśniewska" />
        <PersonCard image="" name="Kasia Wiśniewska" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;