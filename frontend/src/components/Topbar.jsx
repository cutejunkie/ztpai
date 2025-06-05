import { useNavigate } from 'react-router-dom';

function Topbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/v1/logout/', {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      console.error("error while logging out:", error);
    }

    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

    return (
    <div className="Topbar">
      <button className="Topbar-button" onClick={handleLogout}>log out</button>
    </div>
  );
}

export default Topbar;
