import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const jwt = localStorage.getItem('access_token');
    if (!jwt) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};