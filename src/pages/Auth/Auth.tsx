import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css'; // Import the CSS module
import { PREFIX } from '../../helpers/API';


const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('Sending login data:', { email, password });
            const response = await fetch(`${PREFIX}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok && data.accessToken) {
                localStorage.setItem('access_token', data.accessToken);
                Cookies.set('refresh_token', data.refreshToken, {
                    secure: true,
                    httpOnly: false,
                    sameSite: 'Strict',
                });
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log('Success', data);
                navigate('/');
            } else {
                console.log('Authentication failed:', data.message);
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${PREFIX}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, surname, email, password }),
            });
            const data = await response.json();
            if (response.ok && data.accessToken) {
                localStorage.setItem('access_token', data.accessToken);
                Cookies.set('refresh_token', data.refreshToken, {
                    secure: true,
                    httpOnly: false,
                    sameSite: 'Strict',
                });
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log('Success', data);
                navigate('/'); // Redirect to home page
            } else {
                console.log('Registration failed:', data.message);
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.authBox}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Notes</h2>
                    <div className={styles.buttonGroup}>
                        <button
                            className={`${styles.button} ${!isRegistering ? styles.active : ''}`}
                            onClick={() => setIsRegistering(false)}
                        >
                            Вход
                        </button>
                        <button
                            className={`${styles.button} ${isRegistering ? styles.active : ''}`}
                            onClick={() => setIsRegistering(true)}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                    {!isRegistering ? (
                        <form onSubmit={handleLogin}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Электронная почта"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Пароль"
                                    className={styles.input}
                                />
                            </div>
                            <button type="submit" className={styles.submitButton}>
                                Вход
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Имя"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    placeholder="Фамилия"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Электронная почта"
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Пароль"
                                    className={styles.input}
                                />
                            </div>
                            <button type="submit" className={styles.submitButton}>
                                Зарегистрироваться
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
