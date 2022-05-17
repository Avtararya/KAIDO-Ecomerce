import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginFail, loginStart, loginSuccess } from '../redux/userSlice';
import { publicRequest } from '../requests';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogin = async e => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await publicRequest.post('/auth/login', {
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      history.push('/admin');
    } catch (err) {
      dispatch(loginFail());
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} style={{ padding: 10, width: 100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
