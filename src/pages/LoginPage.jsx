import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://muhammads-server.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      navigate('/admin/inbox');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 sm:p-7 rounded shadow-md sm:shadow-lg md:shadow-xl w-full max-w-sm mx-auto">
        <div className='flex justify-center mb-2 sm:mb-2.5'>
          <h2 className="text-sm sm:text-base md:text-[17.5px] font-bold text-black border-b-2 pb-1 border-blue-800 w-fit">Admin Login</h2>
        </div>

        <p className="mb-4 sm:mb-6 text-center text-xs sm:text-[12.5px] text-gray-600">
          Admin login to manage contact form messages.
        </p>

        {error && (
          <div className="mb-4 sm:mb-6 p-2 bg-red-50 border border-red-100 rounded">
            <p className="text-red-500 text-xs sm:text-xs font-medium text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <TextField
            fullWidth
            variant="filled"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              style: {
                fontSize: '13px',
                fontWeight: '500',
                opacity: '0.8',
                fontFamily: '"Lexend Deca", sans-serif'
              }
            }}
            InputLabelProps={{ style: { fontSize: '12px' } }}
          />

          <TextField
            fullWidth
            variant="filled"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              style: {
                fontSize: '13px',
                fontWeight: '500',
                opacity: '0.8',
                fontFamily: '"Lexend Deca", sans-serif'
              }
            }}
            InputLabelProps={{ style: { fontSize: '12px' } }}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 sm:py-2.5 text-xs sm:text-[12.5px] mt-2 cursor-pointer bg-black text-white rounded transition-all duration-200 ease-in-out hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
