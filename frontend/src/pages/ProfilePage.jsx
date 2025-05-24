import "../App.css";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Profile from '../components/Profile';

function ProfilePage() {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="Background">
          <div className="Profile-container">
          <Profile image="" name="Anna Kowalska" date="2025" />
          </div>
      </div>
    </div>
  );
}

export default ProfilePage;
