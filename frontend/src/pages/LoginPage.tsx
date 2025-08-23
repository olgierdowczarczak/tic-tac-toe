import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);

        axios.post(`${import.meta.env.VITE_API_SERVER_URL}/api/users/login`, { username, password })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            })
            .catch(err => setError(err.message));
    }

    return (
        <>
            <h1>Login page</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder='username' required />
                <br />
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='password' required />
                <br />
                <button type='submit'>Login</button>
            </form>
        </>
    );
}

export default LoginPage;
