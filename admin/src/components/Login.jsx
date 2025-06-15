import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // default role

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/${role}`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(`Logged in as ${role}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Login Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 w-full">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 w-full">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3 w-full">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Role</label>
<select
  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white text-gray-700"
  value={role}
  onChange={(e) => setRole(e.target.value)}
  required
>
  <option value="" disabled>Select a Role</option>
  <option value="admin">Admin</option>
  <option value="superadmin">Super Admin</option>

            </select>
          </div>
          <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
