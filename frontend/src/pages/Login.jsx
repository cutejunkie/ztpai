import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Cookies  from 'js-cookie';
import '../App.css';

function Login() {
useEffect(() => {
    fetch('http://localhost:8000/api/v1/csrf/', {
      credentials: 'include'
    })
    .then(() => {
      // token jest teraz w ciasteczku csrftoken
    });
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // zapobiega przeładowaniu strony

    try {
      const csrf = Cookies.get('csrftoken');
      // console.log(csrf);
      const response = await fetch('http://localhost:8000/api/v1/login/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf,
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        localStorage.setItem("loggedIn", "true");
        alert('Logowanie zakończone sukcesem!');
        navigate('/');
      } else {
        alert('Błąd logowania');
      }
    } catch (error) {
      console.error('Błąd połączenia:', error);
      alert('Błąd serwera');
    }
  };

  return (
    <div className="Background-login">
      <div className="login-topbar">
        <img src="src/assets/logo.png" alt="logo" />
      </div>

      <h2>LOG IN</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
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
        <button type="submit" className="login-button">LOG IN</button>
      </form>

      <p>don't have an account? <a href="/register">register now</a></p>
    </div>
  );
}

export default Login;

