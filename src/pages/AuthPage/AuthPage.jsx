import { useState } from 'react';
import './AuthPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Logo from '../../components/Logo/Logo';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="AuthPage">
      <div className="auth-container">
        <Logo />
        <h1 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP!' : 'LOG IN'}</h1>
      </div>
      {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
    </main>
  );
}

