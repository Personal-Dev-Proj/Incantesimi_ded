import { createContext, useContext, useEffect, useState } from "react";
import { fetchCollectionDataDb } from "./functions.js";

// Creazione del Context
const SpellsContext = createContext();

// Provider per il Context
export function SpellsProvider({ children }) {
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCollectionDataDb("spells", (data) => {
            setSpells(data);
            setLoading(false);
        });
    }, []);

    return (
        <SpellsContext.Provider value={{ spells, loading }}>
            {children}
        </SpellsContext.Provider>
    );
}

// Hook per accedere al Context più facilmente
export function useSpells() {
    return useContext(SpellsContext);
}