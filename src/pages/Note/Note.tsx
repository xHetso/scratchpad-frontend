import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Note.module.css';
import api from '../../helpers/api';
import { Note as NoteInterface } from '../../interfaces/note.interface';
import NoteForm from '../../components/NoteForm/NoteForm';
import Button from '../../components/UI/Button/Button';

const Note = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [note, setNote] = useState<NoteInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get<NoteInterface>(`/notes/${id}`);
                setNote(response.data);
            } catch {
                setError('Ошибка при получении заметки');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const handleSave = useCallback(async () => {
        if (!note) return;

        try {
            await api.put<NoteInterface>(`/notes/${id}`, {
                title: note.title,
                content: note.content,
            });
            navigate('/');
        } catch {
            setError('Ошибка при обновлении заметки');
        }
    }, [note, id, navigate]);

    const handleDelete = useCallback(async () => {
        if (window.confirm('Вы уверены, что хотите удалить эту заметку?')) {
            try {
                await api.delete(`/notes/${id}`);
                navigate('/');
            } catch {
                setError('Ошибка при удалении заметки');
            }
        }
    }, [id, navigate]);

    const handleChange = (field: 'title' | 'content', value: string) => {
        if (note) {
            setNote({ ...note, [field]: value });
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
            <NoteForm
                title={note.title}
                content={note.content}
                onTitleChange={(value) => handleChange('title', value)}
                onContentChange={(value) => handleChange('content', value)}
            />
            <p className={styles.title}>Создано: {new Date(note.createdAt).toLocaleString()}</p>
            <div className={styles.buttons}>
                <Button onClick={handleSave}>Сохранить</Button>
                <Button onClick={handleDelete}>Удалить</Button>
            </div>
        </div>
    );
};

export default Note;
