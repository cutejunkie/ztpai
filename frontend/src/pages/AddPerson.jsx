import "../App.css";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useState } from 'react';

function AddPerson() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    ideas: '',
    favourite: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/cards/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // jeśli używasz JWT:
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include', // jeśli logowanie przez sesję
        body: JSON.stringify({
          title: formData.name,
          content: formData.ideas
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Card added successfully!");
      } else {
        alert("Error: " + (data?.error?.message || "failed to create card"));
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Connection error");
    }
  };

  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="Background">
        <h2 style={{ textAlign: "center" }}>ADD PERSON</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="ideas"
            placeholder="ideas..."
            value={formData.ideas}
            onChange={handleChange}
            rows={5}
            required
            style={inputStyle}
          />

          <div style={rowStyle}>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, favourite: !formData.favourite })}
              style={buttonStyle}
            >
              {formData.favourite ? "✓ marked" : "mark as favourite"}
            </button>
          </div>

          <button type="submit" style={{ ...buttonStyle, alignSelf: "center", width: "50%" }}>
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  border: "1px solid #333",
  borderRadius: "6px"
};

const buttonStyle = {
  backgroundColor: "#CAD1CC",
  border: "1px solid #333",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  textAlign: "center",
};

const formStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#8DA190",
  padding: "30px",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const rowStyle = {
  display: "flex",
  gap: "20px",
  justifyContent: "center"
};

export default AddPerson;
