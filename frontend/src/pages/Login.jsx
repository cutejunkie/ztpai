import '../App.css';

function Login() {
  return (
    <div className="Background-login">
      <div className="login-topbar">
        <img src="src/assets/logo.jpg" alt="logo" />
      </div>

      <h2>LOG IN</h2>

      <form className="login-form">
        <input type="email" placeholder="e-mail address" required />
        <input type="password" placeholder="password" required />
        <button type="submit" className="login-button">LOG IN</button>
      </form>

      <p>don't have an account? <a href="/register">register now</a></p>
      
    </div>
  );
}

export default Login;
