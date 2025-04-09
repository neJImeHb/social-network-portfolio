import React, { useState } from 'react';
import axios from 'axios';
import backendUrl from '..//config';
import './CSS/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/register`, { username, password });
            localStorage.setItem('authToken', response.data.token);
            window.location.href = '/';
        } catch (error) {
            setError('Помилка реєстрації');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;