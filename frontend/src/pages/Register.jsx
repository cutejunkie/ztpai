import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import '../App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert('Rejestracja zakończona sukcesem!');
        navigate('/login');
      } else {
        alert(data.error?.message || 'Błąd rejestracji');
      }
    } catch (error) {
      console.error('Błąd połączenia:', error);
      alert('Błąd serwera');
    }
  };

  return (
    <div className="Background-login">
      <div className="login-topbar">
        <img src="src/assets/logo.jpg" alt="logo" />
      </div>

      <h2>REGISTER NOW</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="e-mail address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="your name"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="register-button">REGISTER</button>
      </form>

      <p>have an account already? <Link to="/login">log in</Link></p>
    </div>
  );
}

export default Register;
