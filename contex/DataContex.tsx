// contexts/DataContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface BusData {
    date: string;
    time: string;
    source: string;
    destination: string;
    seatNumbers: string[];
    passengerName: string;
    busName: string;
}

interface DataContextProps {
    data: BusData;
    setData: React.Dispatch<React.SetStateAction<BusData>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<BusData>({ date: '', time: '', source: '', destination: '', seatNumbers: [], passengerName: '', busName: '' });

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextProps => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
