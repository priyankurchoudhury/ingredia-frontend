import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/api';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { data } = await forgotPassword(email);
      setSuccess(true);
      // In demo mode, the token is returned directly
      // In production with email, you'd just show the success message
      if (data.resetToken) {
        setResetToken(data.resetToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo-icon"></span>
          <h1 className="auth-title">Forgot password?</h1>
          <p className="auth-subtitle">
            Enter your email and we'll help you reset it
          </p>
        </div>

        {error && <p className="auth-error">{error}</p>}

        {success ? (
          <div className="forgot-success">
            <div className="success-icon">✓</div>
            <h3 className="success-title">Check your email</h3>
            <p className="success-text">
              If an account with that email exists, we've sent reset instructions.
            </p>

            {/* Demo mode: show reset link directly */}
            {resetToken && (
              <div className="demo-notice">
                <p className="demo-label">Demo mode — use this link to reset:</p>
                <Link
                  to={`/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`}
                  className="demo-link"
                >
                  Reset my password
                </Link>
              </div>
            )}

            <Link to="/login" className="back-to-login">Back to login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}

        {!success && (
          <p className="auth-switch">
            Remember your password? <Link to="/login">Log in</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;