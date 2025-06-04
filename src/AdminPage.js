import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
//import '../Login.css';


const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('accountant');
  const [accountants, setAccountants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Зөвхөн admin хэрэглэгч л энэ хуудсыг үзэх эрхтэй
  useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/');
    return;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== 'admin') {
      navigate('/');
    }
  } catch (error) {
    console.error('Токен задлахад алдаа:', error);
    navigate('/');
  }
}, [navigate]); // ← navigate-г dependencies дотор нэмсэн!

  const handleRegister = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Та эхлээд нэвтрэх хэрэгтэй!');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/auth/register', {
        email: username,
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
      setRole('');

      // Шинэ бүртгэгдсэн хэрэглэгчийг шууд нэмэх эсвэл дахин ачаалах
      fetchAccountants();
    } catch (err) {
      console.error("Алдаа:", err.response?.data || err.message);
      alert('Алдаа гарлаа: ' + (err.response?.data?.message || err.message));
    }
  };

  const fetchAccountants = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/users?role=accountant");
      const data = await response.json();
      console.log("data: ", data);//
      setAccountants(data);
      setLoading(false);
    } catch (error) {
      console.error("Accountant жагсаалт авахад алдаа гарлаа:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountants();
  }, []);
  useEffect(() => {
  console.log("Accountants state:", accountants); // ← энэ нэм
}, [accountants]);


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4"> Сайн уу? Admin</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
            placeholder="Имэйл"
            className="border p-2 w-full"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='new-password'
            placeholder="Нууц үг"
            type="password"
            className="border p-2 w-full"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="accountant">Accountant</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Бүртгэх
          </button>
        </form>
      </div>

      <div>
  <h3 className="text-xl font-semibold mb-4">Нягтлангуудын жагсаалт</h3>

  {loading ? (
    <p className="text-gray-500">Ачааллаж байна...</p>
  ) : (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2">#</th>
          <th className="border px-4 py-2">Имэйл</th>
          <th className="border px-4 py-2">Эрх</th>
        </tr>
      </thead>
      <tbody>
        {accountants.length > 0 ? (
          accountants.map((user, index) => (
            <tr key={user._id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="border px-4 py-2 text-center text-red-500">
              Нягтлан хэрэглэгч олдсонгүй
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )}
</div>

    </div>
  );
};

export default AdminPage;
