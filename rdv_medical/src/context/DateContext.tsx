'use client';
import React, { createContext, useContext, useState, ReactNode } from "react";

type DateContextType = {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: { children: ReactNode }) => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Par défaut : date actuelle
    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};

export const useDateContext = () => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error("useDateContext doit être utilisé dans un DateProvider");
    }
    return context;
};