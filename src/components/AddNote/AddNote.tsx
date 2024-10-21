import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddNote.module.css';
import api from '../../helpers/api';
import axios from 'axios';
import NoteForm from '../NoteForm/NoteForm';
import Button from '../UI/Button/Button';

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
            <NoteForm
                title={title}
                content={content}
                onTitleChange={setTitle}
                onContentChange={setContent}
            />
            <Button onClick={handleSave}>Сохранить</Button>
        </div>
    );
};

export default AddNote;
