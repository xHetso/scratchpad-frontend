import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const getCookie = (name: string): string | null | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const jwt = localStorage.getItem('access_token');
    const refreshToken = getCookie('refresh_token');

    if (!jwt) {
        if (!refreshToken) {
            return <Navigate to="/auth" replace />;
        }
        return <Navigate to="/refresh_token" replace />;
    }

    return <>{children}</>;
};
