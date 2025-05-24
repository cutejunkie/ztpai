function Sidebar() {
    return (
      <div className="Sidebar">
        <img className="Sidebar-logo" src="src/assets/logo.jpg" alt="logo"></img>
        <div className="Sidebar-buttons">
          <button>main page</button>
          <button>profile</button>
          <button>add person</button>
          <button>favourites</button>
        </div>
      </div>
    );
}

export default Sidebar;
