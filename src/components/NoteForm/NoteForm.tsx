import React from 'react';
import styles from './NoteForm.module.css';

interface NoteFormProps {
    title: string;
    content: string;
    onTitleChange: (value: string) => void;
    onContentChange: (value: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ title, content, onTitleChange, onContentChange }) => {
    return (
        <div>
            <p className={styles.title}>Название</p>
            <input
                type="text"
                className={styles.input}
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Заголовок"
            />
            <p className={styles.title}>Текст</p>
            <textarea
                className={styles.textarea}
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                placeholder="Содержимое заметки"
            />
        </div>
    );
};

export default NoteForm;
