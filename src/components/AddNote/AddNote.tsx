import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddNote.module.css';
import api from '../../helpers/api';
import axios from 'axios';

const AddNote = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            await api.post('/notes', {
                title,
                content,
            });
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message || 'Ошибка при добавлении заметки');
            } else {
                setError('Ошибка при добавлении заметки');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Добавить новую заметку</h1>
            {error && <p className={styles.error}>{error}</p>}
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
