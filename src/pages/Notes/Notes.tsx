import { useEffect, useState, FC } from 'react';
import axios from 'axios';
import styles from './Notes.module.css';
import { Link } from 'react-router-dom';

interface Note {
    _id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
}

const fetchNotes = async (): Promise<Note[]> => {
    const token = localStorage.getItem('access_token');

    const response = await axios.get<Note[]>('http://localhost:4200/api/notes', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

const Notes: FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const fetchedNotes = await fetchNotes();
                setNotes(fetchedNotes);
            } catch {
                setError('Error fetching notes');
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, []);

    if (loading) {
        return <p>Loading notes...</p>;
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
