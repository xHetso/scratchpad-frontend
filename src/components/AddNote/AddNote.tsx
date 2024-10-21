import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AddNote.module.css';

const AddNote = () => {
    const navigate = useNavigate(); // Хук для навигации
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        const token = localStorage.getItem('access_token');

        try {
            await axios.post('http://localhost:4200/api/notes', {
                title,
                content,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/');
        } catch {
            setError('Ошибка при добавлении заметки');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Добавить новую заметку</h1>
            {error && <p className={styles.error}>{error}</p>} {/* Показываем ошибку, если есть */}
            <input
                type="text"
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок"
            />
            <textarea
                className={styles.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Содержимое заметки"
            />
            <button className={styles.button} onClick={handleSave}>Сохранить</button>
        </div>
    );
};

export default AddNote;
