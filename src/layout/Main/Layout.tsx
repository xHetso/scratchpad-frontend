import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import styles from './Layout.module.css';

const Layout = () => {
    return (
        <div className={styles['main-layout']}>
            <Navigation />
            <div className={styles['layout-content']}>
                <Header logo="/react.svg" title="NOTES"></Header>
                <div className={'layout-content'}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
