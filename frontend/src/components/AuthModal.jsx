import { useState } from 'react';
import { login, register } from '../api/listings';

function AuthModal({ onClose, onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const fn = isLogin ? login : register;
    const data = await fn(email, password);
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      onAuth(data.token, data.user);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{isLogin ? 'Anmelden' : 'Registrieren'}</h2>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Laden...' : isLogin ? 'Anmelden' : 'Registrieren'}
        </button>
        <p className="modal-switch" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Noch kein Konto? Registrieren' : 'Bereits ein Konto? Anmelden'}
        </p>
      </div>
    </div>
  );
}

export default AuthModal;