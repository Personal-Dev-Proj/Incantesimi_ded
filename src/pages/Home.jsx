import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCollectionDataDb } from "../utils/functions.js" 
import { useSpells } from "../utils/SpellContext.jsx";


export default function Home(){

    const { spells, loading } = useSpells();
    const [filteredSpells, setFilteredSpells] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        magicSchool: "",
        class: "",
    });

    useEffect(() => {
        setFilteredSpells(spells);
    }, [spells]);

    // Filtra gli incantesimi quando i filtri cambiano
    useEffect(() => {
        const applyFilters = () => {
            const { name, magicSchool, class: spellClass } = filters;

            const filtered = spells.filter((spell) => {
                const matchesName = spell.spellName.toLowerCase().includes(name.toLowerCase());
                const matchesMagicSchool = magicSchool ? spell.magicSchool === magicSchool : true;
                const matchesClass = spellClass ? spell.classes?.[spellClass]?.isChecked : true;

                return matchesName && matchesMagicSchool && matchesClass;
            });

            setFilteredSpells(filtered);
        };

        applyFilters();
    }, [filters, spells]);

    // Aggiorna i filtri
    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };



    return(
        <>
            <header className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center my-5 display-4 fw-bold title-font">Lista Incantesimi D&D 3.5</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 my-1">
                        <input
                                type="text"
                                className="form-control bg-input"
                                placeholder="Cerca per nome"
                                value={filters.name}
                                onChange={(e) => handleFilterChange("name", e.target.value)}
                            />
                    </div>
                    <div className="col-12 col-md-4 my-1">
                            <select
                            className="form-select bg-input"
                            value={filters.magicSchool}
                            onChange={(e) => handleFilterChange("magicSchool", e.target.value)}
                            >
                                <option value="">Tutte le scuole di magia</option>
                                <option value="Abiurazione">Abiurazione</option>
                                <option value="Ammaliamento">Ammaliamento</option>
                                <option value="Divinazione">Divinazione</option>
                                <option value="Evocazione">Evocazione</option>
                                <option value="Illusione">Illusione</option>
                                <option value="Invocazione">Invocazione</option>
                                <option value="Necromanzia">Necromanzia</option>
                                <option value="Trasmutazione">Trasmutazione</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-4 my-1">
                            <select
                                className="form-select bg-input"
                                value={filters.class}
                                onChange={(e) => handleFilterChange("class", e.target.value)}
                            >
                                <option value="">Tutte le classi</option>
                                <option value="Brd">Brd</option>
                                <option value="Chr">Chr</option>
                                <option value="Drd">Drd</option>
                                <option value="Mag/Str">Mag/Str</option>
                                <option value="Pal">Pal</option>
                                <option value="Rgr">Rgr</option>
                            </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center my-5 display-6 fw-bold title title-font">Incantesimi</h2>
                    </div>
                </div>
                    {filteredSpells.length > 0 ? (
                        <div className="row">
                            {filteredSpells.reduce((acc, spell, i) => {
                                if (i % 20 === 0) acc.push([]);
                                acc[acc.length - 1].push(spell);
                                return acc;
                            }, []).map((group, index) => (
                                <div key={`group-${index}`} className="col-12 col-md-6 col-lg-4 my-md-5">
                                    {group.map((spell) => (
                                        <p key={spell.id} className="text-center m-0">
                                            <Link
                                                className="text-decoration-none fs-4 color-s link-inc"
                                                to={`/spell/${spell.id}`}
                                            >
                                                {spell.spellName}
                                            </Link>
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center my-5 display-6">Non ci sono Incantesimi</p>
                    )}
            </header>
        </>
    )
}