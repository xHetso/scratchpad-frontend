import styles from './NotFound.module.css'; // Импортируем CSS-модуль

const NotFound = () => {
    const handleRedirect = () => {
        window.location.href = '/';
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
