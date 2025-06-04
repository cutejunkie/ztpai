import '../App.css';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import PersonCard from '../components/PersonCard';
import { useEffect, useState } from 'react';

function Fav() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/cards/favourites/', {
          credentials: 'include',
        });

        const data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.error("Error fetching favourite cards:", error);
      }
    };

    fetchFavourites();
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
              image=""
              name={card.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fav;
