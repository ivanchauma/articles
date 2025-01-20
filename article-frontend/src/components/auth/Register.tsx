import React, { useState } from 'react';
import { registerUser } from '../../features/auth/authSlice';
import { RootState } from '../../store';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootState) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, password_confirmation));
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Register</h2>
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_confirmation" className="form-label">Password Confirmation</label>
            <input
              id="password_confirmation"
              type="password"
              className="form-control"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
