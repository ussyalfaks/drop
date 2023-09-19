import { useState } from 'react';
import app from './firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const auth = getAuth(app);
  const navigate = useNavigate();

const signIn = () =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log(user);
      navigate('/gallery');
    })
    .catch((error) => {
      const errorCode = error.code;
    alert(errorCode);
    });
}

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <button className="login-button" onClick={signIn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
