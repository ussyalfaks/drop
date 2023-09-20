import { useState } from 'react';
import app from '../components/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../style/App.css';






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
    <>
    <div className="login-box">
        <h2>Login</h2>
        <div className="user-box">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <label>Username</label>
          </div>
          <div className="user-box">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <label>Password</label>
          </div>
          <button onClick={signIn}>Submit</button>
      </div>
      </>
  );
};

export default Login;
