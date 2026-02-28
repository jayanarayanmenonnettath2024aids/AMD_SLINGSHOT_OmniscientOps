import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock session check
        const savedUser = localStorage.getItem('nyayai_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        const userObj = { ...userData, id: 'u1' };
        setUser(userObj);
        localStorage.setItem('nyayai_user', JSON.stringify(userObj));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nyayai_user');
    };

    const register = (userData) => {
        // Mock registration
        return login(userData);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
