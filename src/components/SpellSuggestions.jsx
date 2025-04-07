export default function SpellSuggestions({ suggestions, onSelect }) {
    return(
        <div className="suggestions-box border rounded w-100 shadow-sm">
            {suggestions.map((suggestion) => (
                <div
                key={suggestion.id}
                className="suggestion-item p-2 hover-bg-light"
                onMouseDown={() => onSelect(suggestion.spellName)}
                >
                    {suggestion.spellName}
                </div>
            ))}
        </div>
    )
    }