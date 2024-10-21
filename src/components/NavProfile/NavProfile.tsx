import { FC, useEffect, useState } from 'react';
import styles from './NavProfile.module.css';

interface User {
    name: string;
    surname: string;
    roles: string;
}

const NavProfile: FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedUser: User = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data', error);
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data available.</div>;
    }

    return (
        <div className={styles.profile}>
            <img
                className={styles.avatar}
                src="/avatar.jpg"
                alt="Rounded avatar"
            />
            <h1 className={styles.userName}>{user.name} {user.surname}</h1>
            <h2 className={styles.userRole}>{user.roles}</h2>
        </div>
    );
};

export default NavProfile;
