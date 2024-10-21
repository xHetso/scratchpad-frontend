import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Note.module.css';
import api from '../../helpers/api';
import { Note as NoteInterface } from '../../interfaces/note.interface';


const Note = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [note, setNote] = useState<NoteInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get<NoteInterface>(`/notes/${id}`);
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
        try {
            await api.put<NoteInterface>(`/notes/${id}`, {
                title,
                content,
            });
            navigate('/');
        } catch {
            setError('Ошибка при обновлении заметки');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить эту заметку?')) {
            try {
                await api.delete(`/notes/${id}`);
                navigate('/');
            } catch {
                setError('Ошибка при удалении заметки');
            }
        }
    };

    if (loading) {
        return <p>Загрузка заметки...</p>;
    }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    if (!note) {
        return <p>Заметка не найдена</p>;
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                Название
            </p>
            <input
                type="text"
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок"
            />
            <p className={styles.title}>
                Текст
            </p>
            <textarea
                className={styles.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Содержимое заметки"
            />
            <p className={styles.title}>Создано: {new Date(note.createdAt).toLocaleString()}</p>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={handleSave}>Сохранить</button>
                <button className={styles.button} onClick={handleDelete}>Удалить</button>
            </div>
        </div>
    );
};

export default Note;
