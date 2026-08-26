import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Email atau password salah!');
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0" style={{ borderRadius: '16px' }}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
                    <i className="ph-fill ph-notebook"></i> Logbook Pro
                  </h2>
                  <p className="text-muted">Selamat datang kembali! Silakan masuk.</p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Email</label>
                    <div className="input-group-custom">
                      <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      <i className="ph ph-envelope"></i>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-medium">Password</label>
                    <div className="input-group-custom">
                      <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      <i className="ph ph-lock-key"></i>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2 mb-3 fw-semibold">Login</button>
                  <div className="text-center">
                    <span className="text-muted">Belum punya akun? </span>
                    <Link to="/register" className="text-primary text-decoration-none fw-semibold">Daftar sekarang</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
