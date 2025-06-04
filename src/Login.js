import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import '../Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Холбогдож байна');

  

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      const token = res.data.token;
      setMessage(`Амжилттай нэвтэрлээ`);
      localStorage.setItem('token', token);

      // Token decode хийх
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      console.log('Token доторх role:', role);

      if (role === 'admin') navigate('/admin');
      else if (role === 'accountant') navigate('/accountant');
      else if (role === 'employee') navigate('/employee');
      else setMessage('Тохирох хуудас олдсонгүй');
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(`Алдаа: ${err.response.data.message}`);
      } else if (err.request) {
        setMessage('Backend-тэй холбогдох боломжгүй байна');
      } else {
        setMessage('Алдаа гарлаа: ' + (err.message || 'Тодорхойгүй алдаа'));
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Нэвтрэх</h2>

        {message && (
          <p className={`mb-4 text-center ${message.startsWith('Амжилттай') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <input
          type="email"
          placeholder="Имэйл хаяг"
          value={email}
          autoComplete='new-email'
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          placeholder="Нууц үг"
          autoComplete='new-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=""
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Нэвтрэх
        </button>
      </form>
    </div>
  );
}
