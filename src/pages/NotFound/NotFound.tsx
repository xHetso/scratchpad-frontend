import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className={styles.notFound}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Страница не найдена</p>
            <button className={styles.button} onClick={handleRedirect}>
                На главную
            </button>
        </div>
    );
};

export default NotFound;
