import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDataById, regexUriMagStr } from "../utils/functions.js"
import TextWithBr from "../components/TextWithBr.jsx";



export default function SpellDetails() {
    const { id } = useParams(); // Ottieni l'ID dalla URL
    const [spell, setSpell] = useState(null);

    function objToLink(obj) {
        const elements = []; // Array per contenere gli elementi JSX
        for (const key in obj) {
            if (obj[key].isChecked) {
                elements.push(
                    <span key={key}>
                        <Link className="text-white" to={`/class/${regexUriMagStr(key)}`}>{key}</Link> {obj[key].level},{" "}
                    </span>
                );
            }
        }
        return elements; // Restituisce un array di elementi React
    }

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
                        <h1 className="text-center my-5 display-3 fw-bold title-font">{spell.spellName}</h1>
                </div>
                <div className="col-12 px-3 col-md-10 col-lg-4">
                        <p><strong className="fs-5 text-secondary">Livello:</strong> {objToLink(spell.classes)}</p>
                        <p><strong className="fs-5 text-secondary">Scuola di Magia:</strong> {spell.magicSchool}</p>
                        <p><strong className="fs-5 text-secondary">Componenti:</strong> {spell.components}</p>
                        <p><strong className="fs-5 text-secondary">Tempo di Lancio:</strong> {spell.castTime}</p>
                        <p><strong className="fs-5 text-secondary">Raggio di Azione:</strong> {spell.spellRange}</p>
                </div>
                <div className="col-12 px-3 col-md-10 col-lg-4">
                    <p><strong className="fs-5 text-secondary">Bersaglio/Area/Effetto:</strong> {spell.targetAreaEffect}</p>
                    <p><strong className="fs-5 text-secondary">Durata:</strong> {spell.duration}</p>
                    <p><strong className="fs-5 text-secondary">Tiro Salvezza:</strong> {spell.saveThrow}</p>
                    <p><strong className="fs-5 text-secondary">Resistenza agli Incantesimi:</strong> {spell.spellResistence}</p>
                </div>
                <div className="col-12 px-3 col-md-10 col-lg-8 mt-5">
                        <p><strong className="fs-5 text-secondary">Descrizione:</strong> <TextWithBr text={spell.description} /></p>
                </div>
            </div>
        </section>
    );
}
