import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/UserContext.jsx";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import DynamicFieldList from "../components/DynamicFieldList.jsx";
import SkillDistribution from "../components/SkillDistribution.jsx";



export default function CreateCharacter(){
    const { user, userData } = useUser();
    const [activeTab, setActiveTab] = useState("general");
    const [formData, setFormData] = useState({
        name: "",
        race: "",
        class: "",
        level: 1,
        alignment: "",
        hitPoints: 0,
        armorClass: 10,
        stats: {
            forza: 10,
            destrezza: 10,
            costituzione: 10,
            intelligenza: 10,
            saggezza: 10,
            carisma: 10,
        },
        savingThrows: {
            fortitude: 0,
            refrex: 0,
            will: 0,
        },
        bab: 0,
        talents: [""],
        classAbilities: [""],
        weapons: [""],
        armors: [""],
        skills:{},
    });
    const navigate = useNavigate();

    // Effettua il reindirizzamento se l'utente non è loggato
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (["strength", "destrezza", "costituzione", "intelligence", "saggezza", "carisma"].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    [name]: parseInt(value, 10),
                },
            }));
        } else if(["tempra", "riflessi", "volontà"].includes(name)){
            setFormData((prev) => ({
                ...prev,
                savingThrows: {
                    ...prev.savingThrows,
                    [name]: parseInt(value, 10),
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleDynamicChange = (field, index, value) => {
        setFormData((prev) => {
            const updatedField = [...prev[field]];
            updatedField[index] = value;
            return { ...prev, [field]: updatedField };
        });
    };

    const addDynamicField = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
        }));
    };

    const removeDynamicField = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleSkillsChange = (skills) => {
        setFormData((prev) => ({
            ...prev,
            skills: skills.reduce((acc, value, index) => {
                acc[skillNames[index]] = value; // Usa i nomi delle abilità come chiavi
                return acc;
            }, {}),
        }));
    };

    const skillNames = [
        "Acrobazia",
        "Addestrare Animali",
        "Artigianato",
        "Cavalcare",
        "Conoscenze (Arcane)",
        "Conoscenze (Dungeon)",
        "Conoscenze (Geografia)",
        "Diplomazia",
        "Disattivare Congegni",
        "Furtività",
        "Guarire",
        "Intuizione",
        "Intrattenere",
        "Nuotare",
        "Percepire Intenzioni",
        "Raccogliere Informazioni",
        "Saltare",
        "Sopravvivenza",
        "Utilizzare Oggetti Magici",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                characters: arrayUnion(formData),
            });
            alert("Personaggio creato con successo!");
            navigate("/dashboard"); // Reindirizza alla dashboard o un'altra pagina
        } catch (error) {
            console.error("Errore durante la creazione del personaggio:", error);
            alert("C'è stato un errore durante la creazione del personaggio.");
        }
    };

    return(
        <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 mb-5">
                    <h1 className="text-center display-4 fw-bold title-font my-5">Crea un nuovo personaggio</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-4" >
                    <button onClick={() => setActiveTab("general")}>
                        GENERALE
                    </button>
                </div>
                <div className="col-4" >
                    <button onClick={() => setActiveTab("skills")}>
                    ABILITA'
                    </button>
                </div>
                <div className="col-4" >
                    <button onClick={() => setActiveTab("talents")}>
                    TALENTI
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                    {/* General Tab */}
                    {activeTab === "general" && (
                        <>
                        <div className="mb-3">
                            <label className="form-label">Nome del personaggio</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Classe</label>
                            <input
                                type="text"
                                name="class"
                                className="form-control"
                                value={formData.class}
                                onChange={handleInputChange}
                                required
                                />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Razza</label>
                            <input
                                type="text"
                                name="race"
                                className="form-control"
                                value={formData.race}
                                onChange={handleInputChange}
                                required
                                />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Livello</label>
                            <input
                                type="number"
                                name="level"
                                className="form-control"
                                value={formData.level}
                                min="1"
                                max="40"
                                onChange={handleInputChange}
                                required
                                />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Allineamento</label>
                            <input
                                type="text"
                                name="alignment"
                                className="form-control"
                                value={formData.alignment}
                                onChange={handleInputChange}
                                required
                                />
                        </div>
                        <div>
                            <h3>Statistiche</h3>
                            {["forza", "destrezza", "costituzione", "intelligenza", "saggezza", "carisma"].map((stat) => (
                                <div key={stat} className="mb-3">
                                    <label className="form-label">{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
                                    <input
                                        type="number"
                                        name={stat}
                                        className="form-control"
                                        value={formData.stats[stat]}
                                        min="1"
                                        max="20"
                                        onChange={handleInputChange}
                                        />
                                </div>
                            ))}
                        </div> 
                        <div className="mb-3">
                            <label className="form-label">Punti ferita</label>
                            <input
                                type="number"
                                name="hitPoints"
                                className="form-control"
                                value={formData.hitPoints}
                                min="1"
                                max="1000"
                                onChange={handleInputChange}
                                required
                                />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Classe Armatura</label>
                            <input
                                type="number"
                                name="level"
                                className="form-control"
                                value={formData.armorClass}
                                min="1"
                                max="100"
                                onChange={handleInputChange}
                                required
                                />
                        </div> 
                        <div className="mb-3">
                            <label className="form-label">Movimento</label>
                            <input
                                type="number"
                                name="level"
                                className="form-control"
                                value={formData.movement}
                                min="1"
                                max="100"
                                onChange={handleInputChange}
                                required
                                />
                        </div> 
                        <div className="mb-3">
                            <label className="form-label">Iniziativa</label>
                            <input
                                type="number"
                                name="level"
                                className="form-control"
                                value={formData.initiative}
                                min="1"
                                max="100"
                                onChange={handleInputChange}
                                required
                                />
                        </div> 
                        <div>
                            <h3>Tiri Salvezza</h3>
                            {["tempra", "riflessi", "volontà"].map((stat) => (
                                <div key={stat} className="mb-3">
                                    <label className="form-label">{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
                                    <input
                                        type="number"
                                        name={stat}
                                        className="form-control"
                                        value={formData.savingThrows[stat]}
                                        min="1"
                                        max="100"
                                        onChange={handleInputChange}
                                        />
                                </div>
                            ))}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bonus Attacco Base</label>
                            <input
                                type="number"
                                name="level"
                                className="form-control"
                                value={formData.bab}
                                min="1"
                                max="100"
                                onChange={handleInputChange}
                                required
                                />
                        </div>
                        </>
                    )}
                    {/* Skills Tab */}
                    {activeTab === "skills" && (
                        <>
                            {/* ABILITA' */}
                            <SkillDistribution onPointsChange={handleSkillsChange} />
                            <button type="submit" className="btn btn-success">
                                Crea Personaggio
                            </button>
                        </>
                    )}
                    {/* Talents Tab */}
                    {activeTab === "talents" && (
                        <>
                        {/* TALENTI  */}
                        <DynamicFieldList
                            label="Talenti"
                            fields={formData.talents}
                            onAddField={() => addDynamicField("talents")}
                            onRemoveField={(index) => removeDynamicField("talents", index)}
                            onFieldChange={(index, value) => handleDynamicChange("talents", index, value)}
                            />
                        {/* ABILITA DI CLASSE  */}
                        <DynamicFieldList
                            label="Abilità di Classe"
                            fields={formData.classAbilities}
                            onAddField={() => addDynamicField("classAbilities")}
                            onRemoveField={(index) => removeDynamicField("classAbilities", index)}
                            onFieldChange={(index, value) => handleDynamicChange("classAbilities", index, value)}
                            />
                        {/* ARMI  */}
                        <DynamicFieldList
                            label="Armi"
                            fields={formData.weapons}
                            onAddField={() => addDynamicField("weapons")}
                            onRemoveField={(index) => removeDynamicField("weapons", index)}
                            onFieldChange={(index, value) => handleDynamicChange("weapons", index, value)}
                            />
                        {/* ARMATURE  */}
                        <DynamicFieldList
                            label="Armature"
                            fields={formData.armors}
                            onAddField={() => addDynamicField("armors")}
                            onRemoveField={(index) => removeDynamicField("armors", index)}
                            onFieldChange={(index, value) => handleDynamicChange("armors", index, value)}
                            />
                        </>
                    )}
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}