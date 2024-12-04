import { createContext, FC, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<{
    isAuthenticated: boolean;
    handleSetAuthentication: (val: boolean) => void;
} | null>(null);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
        return () => {
            setIsAuthenticated(false);
        };
    }, []);

    const handleSetAuthentication = (val: boolean) => {
        setIsAuthenticated(val);
    };
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, handleSetAuthentication }}
        >
            {children}
        </AuthContext.Provider>
    );
};
