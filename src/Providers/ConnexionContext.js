import { createContext, useContext, useState } from 'react';

export const ConnexionContext = createContext();

export const useConnexionProvider = () => {
    const context = useContext(ConnexionContext);
    if (context === undefined) {
        throw new Error('useConnexionProvider must be used within a ConnexionProvider');
    }
    return context;
};

export const ConnexionProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);

    return (
        <ConnexionContext.Provider value={{ isConnected, setIsConnected }}>
            {children}
        </ConnexionContext.Provider>
    );
};

export default ConnexionProvider;
