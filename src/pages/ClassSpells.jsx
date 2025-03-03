import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCollectionDataDb } from "../utils/functions.js"; // Funzione per il fetch dei dati

export default function ClassSpells() {
    const { className } = useParams();
    const [filteredSpells, setFilteredSpells] = useState({});

    const classes = {
        Brd: "Bardo",
        Chr: "Chierico",
        Drd: "Druido",
        Pal: "Paladino",
        Rgr: "Ranger",
        "Mag/Str": "Mago/Stregone"
    }

    function regexReverseUriMagStr(string){
        return string.replace(/-/g, "/");;
    }

    useEffect(() => {
        // Fetch di tutti gli incantesimi
        fetchCollectionDataDb("spells", (data) => {
            const classSpells = data.filter((spell) => {
                // Filtra solo gli incantesimi che contengono la classe selezionata
                return spell.classes?.[regexReverseUriMagStr(className)]?.isChecked;
            });

            // Raggruppa gli incantesimi per livello
            const groupedByLevel = classSpells.reduce((acc, spell) => {
                const level = spell.classes[regexReverseUriMagStr(className)]?.level || 0; // Livello dell'incantesimo
                if (!acc[level]) acc[level] = [];
                acc[level].push(spell);
                return acc;
            }, {});

            setFilteredSpells(groupedByLevel);
        });
    }, [className]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-5">Incantesimi {classes[regexReverseUriMagStr(className)]}</h1>
                </div>
            </div>
            <div className="row">

            {Object.keys(filteredSpells).length > 0 ? (
                Object.entries(filteredSpells).map(([level, spells]) => (
                    <div key={level} className="col-12 col-md-6 col-lg-4 my-4">
                        <h2 className="text-secondary text-center text-md-start"><span className="border-bottom px-5 ps-md-0">Livello <span className="color-a">{level}</span></span></h2>
                        <ul className="list-unstyled">
                            {spells.map((spell) => (
                                <li key={spell.id} className="text-center text-md-start">
                                    <Link
                                        to={`/spell/${spell.id}`}
                                        className="text-decoration-none fs-4 color-s link-inc"
                                        >
                                        {spell.spellName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <div className="col-12">
                    <p className="text-center">Non ci sono incantesimi per questa classe.</p>
                </div>
            )}
            </div>
        </div>
    );
}
