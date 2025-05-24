import "../App.css";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useState } from 'react';

function AddPerson() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    ideas: '',
    photo: null,
    favourite: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Person added:", formData);
  };

  return (
    <div>
      <Topbar />
      <Sidebar />
      <div className="Background">
        <h2 style={{ textAlign: "center" }}>ADD PERSON</h2>
        <form onSubmit={handleSubmit} style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#8DA190",
          padding: "30px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: "10px", border: "1px solid #333", borderRadius: "6px" }}
          />

          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            style={{ padding: "10px", border: "1px solid #333", borderRadius: "6px" }}
          />

          <textarea
            name="ideas"
            placeholder="ideas..."
            value={formData.ideas}
            onChange={handleChange}
            rows={5}
            required
            style={{ padding: "10px", border: "1px solid #333", borderRadius: "6px" }}
          />

          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <label style={{ flex: 1 }}>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                style={{ display: "none" }}
                id="upload-photo"
              />
              <label htmlFor="upload-photo" style={buttonStyle}>upload photo</label>
            </label>

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

const buttonStyle = {
  backgroundColor: "#CAD1CC",
  border: "1px solid #333",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  textAlign: "center",
};

export default AddPerson;
