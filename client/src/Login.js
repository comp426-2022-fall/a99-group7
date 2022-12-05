import React, {useState}  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.get('http://localhost:3000/login', { params: { email: email, password: password } }).then((response) => {
            navigate('/profile', { state: { username: response.data.username, email: response.data.email } });
        }).catch((response) =>  {
            alert(response.response.data.error);
        })
      }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <button onClick={() => navigate("/sign-up")}>Sign Up</button>
        </div>
    )
  }

  export default Login;

  
