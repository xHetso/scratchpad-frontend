import { FC, useEffect, useState } from 'react';
import styles from './NavProfile.module.css';

const NavProfile: FC = () => {
    const [user, setUser] = useState<{
        name: string;
        surname: string;
        roles: string;
    } | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.profile}>
            <img
                className={styles.avatar}
                src="/avatar.jpg"
                alt="Rounded avatar"
            />
            <h1 className={styles.userName}>{user.name} {user.surname}</h1>
            <h1 className={styles.userRole}>{user.roles}</h1>
        </div>
    );
};

export default NavProfile;
