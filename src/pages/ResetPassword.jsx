import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';
import './Auth.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tokenFromUrl = searchParams.get('token') || '';
  const emailFromUrl = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    email: emailFromUrl,
    token: tokenFromUrl,
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      await resetPassword(formData.email, formData.token, formData.newPassword);
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. The link may have expired.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo-icon"></span>
          <h1 className="auth-title">Reset password</h1>
          <p className="auth-subtitle">Enter your new password below</p>
        </div>

        {error && <p className="auth-error">{error}</p>}

        {success ? (
          <div className="forgot-success">
            <div className="success-icon">✓</div>
            <h3 className="success-title">Password reset!</h3>
            <p className="success-text">
              Your password has been changed. Redirecting to login...
            </p>
            <Link to="/login" className="back-to-login">Go to login now</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            {!emailFromUrl && (
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            )}

            {!tokenFromUrl && (
              <div className="form-group">
                <label className="form-label">Reset token</label>
                <input
                  type="text"
                  name="token"
                  placeholder="Paste your reset token"
                  value={formData.token}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">New password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="At least 8 characters"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm new password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;