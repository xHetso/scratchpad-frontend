import React, { FormEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import api from '../../helpers/api';

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleAuth = async (endpoint: string, userData: object) => {
        try {
            const response = await api.post(endpoint, userData);
            const data = response.data;

            if (data.accessToken) {
                localStorage.setItem('access_token', data.accessToken);
                Cookies.set('refresh_token', data.refreshToken, {
                    secure: true,
                    httpOnly: false,
                    sameSite: 'Strict',
                });
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                console.error(`${endpoint} failed:`, data.message);
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAuth('/auth/login', { email, password });
    };

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAuth('/auth/register', { name, surname, email, password });
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
                    <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                        {isRegistering && (
                            <>
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
                            </>
                        )}
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
                            {isRegistering ? 'Зарегистрироваться' : 'Вход'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
