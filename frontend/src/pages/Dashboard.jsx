import '../App.css';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import PersonCard from '../components/PersonCard';
// import obraz from './assets/obraz.jpg';

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