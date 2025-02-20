import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataById } from "../utils/functions.js"


export default function SpellDetails() {
    const { id } = useParams(); // Ottieni l'ID dalla URL
    const [spell, setSpell] = useState(null);


    useEffect(() => {
        fetchDataById("spells", id, setSpell)
    }, [id]);


    if (!spell) {
        return <p>Incantesimo non trovato.</p>;
    }

    return (
        <section className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                        <h1 className="text-center my-5 display-3 fw-bold">{spell.spellName}</h1>
                </div>
                <div className="col-12 px-3 col-md-10 col-lg-4">
                        <p><strong className="fs-5 text-secondary">Scuola di Magia:</strong> {spell.magicSchool}</p>
                        <p><strong className="fs-5 text-secondary">Componenti:</strong> {spell.components}</p>
                        <p><strong className="fs-5 text-secondary">Tempo di Lancio:</strong> {spell.castTime}</p>
                        <p><strong className="fs-5 text-secondary">Raggio di Azione:</strong> {spell.spellRange}</p>
                        <p><strong className="fs-5 text-secondary">Bersaglio/Area/Effetto:</strong> {spell.targetAreaEffect}</p>
                        <p><strong className="fs-5 text-secondary">Durata:</strong> {spell.duration}</p>
                        <p><strong className="fs-5 text-secondary">Tiro Salvezza:</strong> {spell.saveThrow}</p>
                        <p><strong className="fs-5 text-secondary">Resistenza agli Incantesimi:</strong> {spell.spellResistence}</p>
                </div>
                <div className="col-12 px-3 col-md-10 col-lg-4">
                        <p><strong className="fs-5 text-secondary">Descrizione:</strong> {spell.description}</p>
                </div>
            </div>
        </section>
    );
}
