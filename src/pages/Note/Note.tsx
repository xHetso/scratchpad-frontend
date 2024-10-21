import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Note.module.css'; // Импортируем модульные стили

interface Note {
    _id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
}

const Note = () => {
    const { id } = useParams<{ id: string }>(); // Получаем ID заметки из URL
    const navigate = useNavigate(); // Хук для навигации
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        const fetchNote = async () => {
            const token = localStorage.getItem('access_token');

            try {
                const response = await axios.get<Note>(`http://localhost:4200/api/notes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNote(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch {
                setError('Ошибка при получении заметки');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const handleSave = async () => {
        const token = localStorage.getItem('access_token');

        try {
            await axios.put<Note>(`http://localhost:4200/api/notes/${id}`, {
                title,
                content,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/');
        } catch {
            setError('Ошибка при обновлении заметки');
        }
    };

    if (loading) {
        return <p>Загрузка заметки...</p>;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>; // Применяем стили к ошибке
    }

    if (!note) {
        return <p>Заметка не найдена</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <input
                    type="text"
                    className={styles.input}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Заголовок"
                />
            </h1>
            <textarea
                className={styles.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Содержимое заметки"
            />
            <p className={styles.date}>Создано: {new Date(note.createdAt).toLocaleString()}</p>
            <button className={styles.button} onClick={handleSave}>Сохранить</button>
        </div>
    );
};

export default Note;
