import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            console.log("Försöker logga in med:", { username, password }); // Debug
            await login({ username, password });
            
            // Hämta ursprunglig destination eller använd startsida
            const from = location.state?.from?.pathname || '/';
            console.log("Omdirigerar till:", from); // Debug
            navigate(from, { replace: true });
            
        } catch (err) {
            console.error("Inloggningsfel:", err); // Debug
            setError(err.message || 'Inloggning misslyckades');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        
        <div className="login-form">
            <h2>Logga in</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Användarnamn"
                    required
                    disabled={isLoading}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Lösenord"
                    required
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loggar in...' : 'Logga in'}
                </button>
            </form>
        </div>
    );
}

export default Login;







/* old Login
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FavoriteButton from '../components/FavoriteButton'
import { login } from '../services/authApi'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [serverMessage, setServerMessage] = useState('')
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const response = await login(data)
            setServerMessage({ type: 'success', text: response.message })
            navMainMenu()
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "Something went wrong!",
            })
        }
    }

    const navMainMenu = () => {
        navigate("/");
    };

    return (
        <div>
            <h2>Login</h2>
            {serverMessage && (
                <p>{serverMessage.text}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name="username"
                    label="Username"
                    register={register}
                    registerOptions={{ required: "Username is required" }}
                    error={errors.username}
                />
                <TextInput
                    type='password'
                    name="password"
                    label="Password"
                    register={register}
                    registerOptions={{ required: "Password is required" }}
                    error={errors.password}
                />
                <Button type="submit">Login</Button>
            </form>
            <LinkButton to='/'>Categories</LinkButton>
        </div>
    )
}

export default Login*/