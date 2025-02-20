import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCollectionDataDb } from "../utils/functions.js" 


export default function Home(){

    const [spells, setSpells] = useState([]);

    useEffect(() => {
        fetchCollectionDataDb("spells", setSpells)
    }, []);



    return(
        <>
            <header className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center my-5 display-4 fw-bold">Lista Incantesimi D&D 3.5</h1>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    {spells.length > 0 ? (
                        <ul className="list-unstyled">
                            {spells.map((spell) => (
                                <li key={spell.id} className="text-center">
                                    <Link className="text-decoration-none fs-4 color-s link-inc" to={`/${spell.id}`}>{spell.spellName}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Non ci sono Incantesimi</p>
                    )}
                    </div>
                </div>
            </header>
        </>
    )
}