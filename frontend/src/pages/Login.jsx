import '../App.css';

function Login() {
  return (
    <div className="Background-login">
      <div className="login-topbar">
        <img src="src/assets/logo.jpg" alt="logo" />
      </div>

      <h2>ZALOGUJ SIĘ</h2>

      <form className="login-form">
        <input type="email" placeholder="adres e-mail" required />
        <input type="password" placeholder="hasło" required />
        <button type="submit" className="login-button">ZALOGUJ SIĘ</button>
      </form>

      <p>nie masz konta? <a href="#">zarejestruj się</a></p>
      
    </div>
  );
}

export default Login;
