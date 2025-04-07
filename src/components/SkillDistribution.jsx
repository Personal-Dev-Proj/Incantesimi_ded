import { useState } from "react";

export default function SkillDistribution({ onPointsChange }){
    const skills = [
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

    const [points, setPoints] = useState(skills.map(() => 0));

    const handlePointChange = (index, value) => {
        const newPoints = [...points];
        newPoints[index] = value;
        setPoints(newPoints);
        onPointsChange(newPoints); // Comunica i cambiamenti al componente genitore
    };

    return (
        <div>
            <h3>Punti Abilità</h3>
            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <div key={index} className="skill-row d-flex align-items-center mb-2">
                        <label className="me-3">{skill}</label>
                        <input
                            type="number"
                            min="0"
                            className="form-control w-25"
                            value={points[index]}
                            onChange={(e) => handlePointChange(index, parseInt(e.target.value) || 0)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}