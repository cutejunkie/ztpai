import { Link } from 'react-router-dom';
import '../App.css';

function Register() {
  return (
    <div className="Background-login">
      <div className="login-topbar">
        <img src="src/assets/logo.jpg" alt="logo" />
      </div>

      <h2>REGISTER NOW</h2>

      <form className="login-form">
        <input type="email" placeholder="e-mail address" required />
        <input type="name" placeholder="your name" required />
        <input type="password" placeholder="password" required />
        <button type="submit" className="register-button">REGISTER</button>
      </form>

      <p>have an account already? <a href="/login">log in</a></p>
      
    </div>
  );
}

export default Register;
