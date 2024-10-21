import { FC } from 'react';
import styles from './NavProfile.module.css';

const NavProfile: FC = () => {
    return (
        <div className={styles.profile}>
            <img
                className={styles.avatar}
                src="/avatar.png"
                alt="Rounded avatar"
            />
            <h1 className={styles.userName}>Hetso Absolute</h1>
            <h1 className={styles.userRole}>Software Engineer</h1>
        </div>
    );
};

export default NavProfile;
