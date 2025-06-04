import { useState } from 'react';
import axios from 'axios';
import './AccountantPage.css';

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');

  const handleRegister = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Та эхлээд нэвтрэх хэрэгтэй!');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        email : username, // username-г email болгож дамжуулж байна
        password,
        role
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Шинэ хэрэглэгч бүртгэгдлээ');
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error("Алдаа:", err.response?.data || err.message);
      alert('Алдаа гарлаа: ' + (err.response?.data?.message || err.message));
    }
  };

  /*return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Шинэ ажилтан бүртгэх</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Имэйл"
          autoComplete='off'
          className="border p-2 w-full"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Нууц үг"
          type="password"
          autoComplete='new-password'
          className="border p-2 w-full"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="employee">Employee</option>
          
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Бүртгэх
        </button>
      </form>
    </div>
  );*/
};

export default AdminPage;
