import '../App.css';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import PersonCard from '../components/PersonCard';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/cards/', {
          credentials: 'include', // jeśli sesje
          // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // jeśli JWT
        });

        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="Background">
        <div className="PersonCard-container">
          {cards.map((card) => (
            <PersonCard
              key={card.uuid}
              image="" // jeśli dodasz później pole "image", wstaw je tutaj
              name={card.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
