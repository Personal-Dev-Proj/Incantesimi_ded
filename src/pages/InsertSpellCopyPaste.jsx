import React, { useState } from "react";
import { stringRegex, createDocDbWithId } from "../utils/functions.js";


export default function InsertSpellCopyPaste() {
    const [textareaValue, setTextareaValue] = useState("");
    const [formData, setFormData] = useState({
        spellName: "",
        magicSchool: "",
        components: "",
        castTime: "",
        spellRange: "",
        targetAreaEffect: "",
        duration: "",
        saveThrow: "",
        spellResistence: "",
        description: "",
        classes: {},
    });

    function parseSpellData(rawText) {
        const lines = rawText.split("\n"); // Dividi il testo in righe
        const formData = {
            spellName: "",
            magicSchool: "",
            components: "",
            castTime: "",
            spellRange: "",
            targetAreaEffect: "",
            duration: "",
            saveThrow: "",
            spellResistence: "",
            description: "",
            classes: {},
        };
    
        // Elenco delle classi ammesse
        const allowedClasses = ["Brd", "Chr", "Drd", "Mag/Str", "Pal", "Rgr"];
    
        formData.spellName = lines[0]?.trim() || ""; // Nome incantesimo dalla prima riga
        formData.magicSchool = lines[1]?.trim().split(" ")[0] || ""; // Scuola di magia dalla seconda riga
    
        lines.slice(2).forEach((line) => {
            if (line.startsWith("Livello:")) {
                const classes = line.replace("Livello:", "").trim().split(", ");
                classes.forEach((cls) => {
                    let [key, level] = cls.split(" ");
                    if (key === "Str") key = "Mag/Str"; // Trasforma "Str" in "Mag/Str"
                    if (allowedClasses.includes(key)) {
                        formData.classes[key] = { isChecked: true, level };
                    }
                });
            } else if (line.startsWith("Componenti:")) {
                formData.components = line.replace("Componenti:", "").trim();
            } else if (line.startsWith("Tempo di lancio:")) {
                formData.castTime = line.replace("Tempo di lancio:", "").trim();
            } else if (line.startsWith("Raggio di azione:")) {
                formData.spellRange = line.replace("Raggio di azione:", "").trim();
            } else if (line.startsWith("Bersaglio, area, effetto:")) {
                formData.targetAreaEffect = line
                    .replace("Bersaglio, area, effetto:", "")
                    .trim();
            } else if (line.startsWith("Durata:")) {
                formData.duration = line.replace("Durata:", "").trim();
            } else if (line.startsWith("Tiro salvezza:")) {
                formData.saveThrow = line.replace("Tiro salvezza:", "").trim();
            } else if (line.startsWith("Resistenza agli incantesimi:")) {
                formData.spellResistence = line
                    .replace("Resistenza agli incantesimi:", "")
                    .trim();
            } else if ( line.trim()) {
                formData.description += line + " "; // Aggiungi la descrizione
            }
        });
    
        formData.description = formData.description.trim(); // Rimuovi spazi superflui
    
        return formData;
    }

    const handleTextSubmit = (rawText) => {
        const parsedData = parseSpellData(rawText);
        console.log(parsedData)
        setFormData(parsedData);
    };

    const handleSubmitToDb = async () => {
        try {
            await createDocDbWithId("spells", stringRegex(formData.spellName), formData)

            setTextareaValue(""); // Resetta la textarea
            setFormData({
                spellName: "",
                magicSchool: "",
                components: "",
                castTime: "",
                spellRange: "",
                targetAreaEffect: "",
                duration: "",
                saveThrow: "",
                spellResistence: "",
                description: "",
                classes: {},
            });

            alert("Dati inviati con successo!");
        } catch (error) {
            console.error("Errore durante l'invio dei dati:", error);
            alert("Errore durante l'invio dei dati. Riprova.");
        }
    };

    

    return (
        <div className="container">
            <h1 className="text-center my-5">Parse Incantesimi</h1>
            <textarea
                className="form-control"
                rows="10"
                placeholder="Inserisci i dati dell'incantesimo"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                onBlur={(e) => handleTextSubmit(e.target.value)}
            ></textarea>
            <div className="mt-5">
                <h2>Dati Estratti:</h2>
                <p><strong>Nome Incantesimo:</strong> {formData.spellName}</p>
                <p><strong>Scuola di Magia:</strong> {formData.magicSchool}</p>
                <p><strong>Componenti:</strong> {formData.components}</p>
                <p><strong>Tempo di Lancio:</strong> {formData.castTime}</p>
                <p><strong>Raggio di Azione:</strong> {formData.spellRange}</p>
                <p><strong>Bersaglio/Area/Effetto:</strong> {formData.targetAreaEffect}</p>
                <p><strong>Durata:</strong> {formData.duration}</p>
                <p><strong>Tiro Salvezza:</strong> {formData.saveThrow}</p>
                <p><strong>Resistenza agli Incantesimi:</strong> {formData.spellResistence}</p>
                <p><strong>Descrizione:</strong> {formData.description}</p>
                <p><strong>Classi:</strong></p>
                <ul>
                    {Object.entries(formData.classes).map(([className, { level }]) => (
                        <li key={className}>
                            {className}: Livello {level}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={handleSubmitToDb} className="btn btn-success my-5">Inserisci Incantesimo</button>
            </div>
        </div>
    );
}
