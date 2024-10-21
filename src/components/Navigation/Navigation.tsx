import { Link } from 'react-router-dom';
import styles from './Navigation.module.css'; // Импортируйте CSS-модуль
import NavProfile from '../NavProfile/NavProfile';

const Navigation = () => {
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        document.cookie = 'refresh_token=; Max-Age=0; path=/';

        // Перенаправление на главную страницу после выхода
        window.location.href = '/';
    };

    return (
        <div className={styles.navigation}>
            <NavProfile />
            <div className={styles.buttons}>
                <Link to="/" className={`${styles['btn-active']} ${styles['btn-nav']}`}>
                    Главная
                </Link>
            </div>
            {/* Используем Link для выхода из системы */}
            <a className={styles['logout-button']} onClick={handleLogout}>
                Выход
            </a>
        </div>
    );
};

export default Navigation;
