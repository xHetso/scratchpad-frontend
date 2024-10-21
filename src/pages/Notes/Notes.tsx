import { useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../helpers/api';
import { Note as NoteInterface } from '../../interfaces/note.interface';
import styles from './Notes.module.css';

const fetchNotes = async (): Promise<NoteInterface[]> => {
    const response = await api.get<NoteInterface[]>('/notes');
    return response.data;
};

const Notes: FC = () => {
    const [notes, setNotes] = useState<NoteInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNotes = async () => {
            setLoading(true);
            try {
                const fetchedNotes = await fetchNotes();
                setNotes(fetchedNotes);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data.message || 'Ошибка при загрузке заметок');
                } else {
                    setError('Ошибка при загрузке заметок');
                }
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, []);

    if (loading) {
        return <p>Загрузка заметки...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Link to="/add-note" className={styles.addNoteButton}>
                Добавить заметку
            </Link>
            <div className={styles.container}>
                {notes.map(note => (
                    <Link to={`/note/${note._id}`} key={note._id} className={styles.note}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <p>{new Date(note.createdAt).toLocaleString()}</p>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Notes;
