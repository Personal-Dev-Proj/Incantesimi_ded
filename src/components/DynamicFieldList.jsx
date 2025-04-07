export default function DynamicFieldList({ label, fields, onAddField, onRemoveField, onFieldChange }) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {fields.map((field, index) => (
                <div key={index} className="d-flex mb-2">
                    <input
                        type="text"
                        className="form-control me-2"
                        value={field}
                        onChange={(e) => onFieldChange(index, e.target.value)}
                        placeholder={`Inserisci ${label.toLowerCase()}`}
                    />
                    {/* Nascondi il pulsante di rimozione per il primo elemento */}
                    {index !== 0 && (
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => onRemoveField(index)}
                        >
                            Rimuovi
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                className="btn btn-primary"
                onClick={onAddField}
            >
                Aggiungi {label.toLowerCase()}
            </button>
        </div>
    );
}
