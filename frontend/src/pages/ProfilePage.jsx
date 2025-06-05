import "../App.css";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Profile from '../components/Profile';
import { useEffect, useState } from 'react';

function formatDate(date){
  const dateNumber=Date.parse(date)
  const formatedDate=new Date(dateNumber)
  return formatedDate.toDateString()
}

function ProfilePage() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/user/profile', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []); 
 
  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="Background">
          <div className="Profile-container">
          <Profile image="" name={profile.username} date={formatDate(profile.date_joined)} />
          </div>
      </div>
    </div>
  );
}

export default ProfilePage;
