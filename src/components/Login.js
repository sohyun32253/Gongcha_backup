import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../Login.css'
import h1Login from '../images/h1_logo.png'

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인 성공');
      setIsAuthenticated(true); 
      navigate('/'); 
      window.scrollTo(0, 0);
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  };

  return (
    <main className='login'>
      <div className='login_banner'>
          <h2>로그인</h2>
      </div>

      <div className='login_form'>
        <h1><img src={h1Login} alt="logo" /></h1>
        <form onSubmit={handleLogin}>
          <p>
            <input type="email"
            placeholder="이메일" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            autoComplete="email" />
          </p>

          <p>
          <input type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            autoComplete="current-password"
          />
          </p>
          
          <button type="submit" className='join_btn'>로그인</button>
        </form>
      </div>
    </main>
  );
}

export default Login;
