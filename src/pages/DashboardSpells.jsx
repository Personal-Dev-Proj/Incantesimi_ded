import React, { useState } from "react";
import CheckboxWithSelect from "../components/CheckboxWithSelect";
import InputField from "../components/InputField";
import TextareaField from "../components/TextareaField";
import SelectField from "../components/SelectField.jsx";
import { stringRegex, createDocDbWithId } from "../utils/functions.js";


export default function DashboardSpells(){
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

    const initialFormData = {
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

    const magicSchools = [
        "Abiurazione",
        "Ammaliamento",
        "Divinazione",
        "Evocazione",
        "Illusione",
        "Invocazione",
        "Necromanzia",
        "Trasmutazione",
    ];

    const [errors, setErrors] = useState({}); // Stato per tracciare errori


    const handleFieldChange = (field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
        setErrors((prevState) => ({
            ...prevState,
            [field]: "", // Rimuovi l'errore quando l'utente interagisce
        }));
    };

    const handleChange = (id, isChecked, level) => {
        setFormData((prevState) => ({
            ...prevState,
            classes: {
                ...prevState.classes,
                [id]: { isChecked, level },
            },
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            "spellName",
            "magicSchool",
            "components",
            "castTime",
            "targetAreaEffect",
            "duration",
            "description",
        ];
    
        const newErrors = {};
    
        requiredFields.forEach((field) => {
            if (!formData[field].trim()) {
                newErrors[field] = "Questo campo è obbligatorio.";
            }
        });

            // Verifica se almeno un checkbox è selezionato
        const hasSelectedCheckbox = Object.values(formData.classes).some(
            (checkbox) => checkbox.isChecked
        );

        if (!hasSelectedCheckbox) {
            newErrors.classes = "Seleziona almeno una classe.";
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0; // Restituisce true se non ci sono errori
        };
    
        const handleSubmit = (event) => {
        event.preventDefault(); // Impedisce il refresh della pagina
        if (validateForm()) {
            createDocDbWithId("spells", stringRegex(formData.spellName), formData)
            console.log("Form inviato con successo:", formData);
                // Resetta il modulo
            setFormData(initialFormData);
            // Puoi aggiungere qui la logica di invio al server
        } else {
            console.log("Form non valido.", formData);
        }
        };


    return(
        <>
            <h1 className="text-center my-5 display-3 fw-bold">Inserisci Nuovo Incantesimo</h1>
            <section className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <InputField
                            id="spellName"
                            label="Nome Incantesimo"
                            placeholder=""
                            value={formData.spellName}
                            onChange={handleFieldChange}
                        />
                        {errors.spellName && <p className="text-danger">{errors.spellName}</p>}

                        <SelectField
                            id="magicSchool"
                            label="Scuola di Magia"
                            value={formData.magicSchool} // Valore attuale
                            firstOption="Scegli la scuola di magia"
                            options={magicSchools} // Opzioni definite
                            onChange={handleFieldChange} // Funzione per catturare il cambiamento
                        />
                        {errors.magicSchool && <p className="text-danger">{errors.magicSchool}</p>}


                        <div className="mb-3">
                            <p className="form-label text-secondary fw-bold border-bottom">Classe</p>
                            <CheckboxWithSelect 
                                id="Mag/Str" 
                                isChecked={formData.classes["Mag/Str"]?.isChecked || false} 
                                level={formData.classes["Mag/Str"]?.level || ""} 
                                label="Mag/Str" 
                                onChange={handleChange} 
                            />
                            <CheckboxWithSelect 
                                id="Chr" 
                                isChecked={formData.classes.Chr?.isChecked || false} 
                                level={formData.classes.Chr?.level || ""} 
                                label="Chr" 
                                onChange={handleChange} 
                            />
                            <CheckboxWithSelect 
                                id="Brd" 
                                isChecked={formData.classes.Brd?.isChecked || false} 
                                level={formData.classes.Brd?.level || ""} 
                                label="Brd" 
                                onChange={handleChange} 
                            />
                            <CheckboxWithSelect 
                                id="Drd" 
                                isChecked={formData.classes.Drd?.isChecked || false} 
                                level={formData.classes.Drd?.level || ""} 
                                label="Drd" 
                                onChange={handleChange} 
                            />
                            <CheckboxWithSelect 
                                id="Pal" 
                                isChecked={formData.classes.Pal?.isChecked || false} 
                                level={formData.classes.Pal?.level || ""} 
                                label="Pal" 
                                onChange={handleChange} 
                            />
                            <CheckboxWithSelect 
                                id="Rgr" 
                                isChecked={formData.classes.Rgr?.isChecked || false} 
                                level={formData.classes.Rgr?.level || ""} 
                                label="Rgr" 
                                onChange={handleChange} 
                            />
                            {errors.classes && <p className="text-danger">{errors.classes}</p>}
                        </div>
                        <InputField
                            id="components"
                            label="Componenti"
                            placeholder=""
                            value={formData.components}
                            onChange={handleFieldChange}
                        />
                        {errors.components && <p className="text-danger">{errors.components}</p>}
                        <InputField
                            id="castTime"
                            label="Tempo di Lancio"
                            placeholder=""
                            value={formData.castTime}
                            onChange={handleFieldChange}
                        />
                        {errors.castTime && <p className="text-danger">{errors.castTime}</p>}
                        <InputField
                            id="spellRange"
                            label="Raggio di Azione"
                            placeholder=""
                            value={formData.spellRange}
                            onChange={handleFieldChange}
                        />
                        <InputField
                            id="targetAreaEffect"
                            label="Bersaglio / Area / Effetto"
                            placeholder=""
                            value={formData.targetAreaEffect}
                            onChange={handleFieldChange}
                        />
                        {errors.targetAreaEffect && <p className="text-danger">{errors.targetAreaEffect}</p>}
                        <InputField
                            id="duration"
                            label="Durata"
                            placeholder=""
                            value={formData.duration}
                            onChange={handleFieldChange}
                        />
                        {errors.duration && <p className="text-danger">{errors.duration}</p>}
                        <InputField
                            id="saveThrow"
                            label="Tiro Salvezza"
                            placeholder=""
                            value={formData.saveThrow}
                            onChange={handleFieldChange}
                        />
                        <InputField
                            id="spellResistence"
                            label="Resistenza agli Incantesimi"
                            placeholder=""
                            value={formData.spellResistence}
                            onChange={handleFieldChange}
                        />
                        <TextareaField
                            id="description"
                            label="Descrizione"
                            rows={3}
                            placeholder=""
                            value={formData.description}
                            onChange={handleFieldChange}
                        />
                        {errors.description && <p className="text-danger">{errors.description}</p>}
                        <div className="mb-3">
                            <button type="submit" className="btn btn-secondary mb-3 w-100">Inserisci Incantesimo</button>
                        </div>
                    </form>
                    </div>
                </div>
            </section>
        </>
    )
}