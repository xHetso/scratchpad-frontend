import { FC } from 'react';
import styles from './Header.module.css';
interface HeaderProps {
    logo: string;
    title: string;
}

const Header: FC<HeaderProps> = ({ logo, title }) => {
    return (
        <header className={styles.header}>
            <div className="logo">
                <img src={logo} alt="logo" className={styles.logo} />
            </div>
            <h1 className="title">{title}</h1>
        </header>
    );
};

export default Header;