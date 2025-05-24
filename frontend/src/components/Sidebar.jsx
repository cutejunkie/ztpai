import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="Sidebar">
      <img className="Sidebar-logo" src="src/assets/logo.jpg" alt="logo" />
      <div className="Sidebar-buttons">
        <Link to="/"><button>main page</button></Link>
        <Link to="/profile"><button>profile</button></Link>
        <Link to="/add"><button>add person</button></Link>
        <Link to="/favourites"><button>favourites</button></Link>
      </div>
    </div>
  );
}

export default Sidebar;
