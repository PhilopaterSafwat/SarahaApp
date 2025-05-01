"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
export interface UserTokenContextType {
    token: string;
    setToken: (token: string) => void;
}


export const UserTokenContext = createContext<UserTokenContextType | null>(null);


export default function UserTokenContextProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string>("");
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);
    return (
        <UserTokenContext.Provider value={{ token, setToken }}>
            {children}
        </UserTokenContext.Provider>
    );
}
