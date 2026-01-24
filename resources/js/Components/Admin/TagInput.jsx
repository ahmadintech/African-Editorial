import { useState, useRef, useEffect } from 'react';
import { X, Tag as TagIcon } from 'lucide-react';

export default function TagInput({ value = [], onChange, suggestions = [], placeholder = "Add a tag..." }) {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    // Filter suggestions locally
    const filteredSuggestions = suggestions
        .filter(s => !value.includes(s.name))
        .filter(s => s.name.toLowerCase().includes(inputValue.toLowerCase()));

    const addTag = (tag) => {
        const trimmed = tag.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
        }
        setInputValue('');
        // Keep focus
        inputRef.current?.focus();
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue.trim()) {
                addTag(inputValue);
            }
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2 p-2 bg-muted/30 border border-border rounded-lg focus-within:ring-2 focus-within:ring-primary/20 transition-all min-h-[42px]">
                {value.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-primary/10 text-primary group animate-in fade-in zoom-in duration-200">
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}

                <div className="relative flex-1 min-w-[120px]">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => {
                            // Delay hiding to allow clicking suggestions
                            setTimeout(() => setShowSuggestions(false), 200);
                        }}
                        placeholder={value.length === 0 ? placeholder : ""}
                        className="w-full bg-transparent border-none p-1 text-sm focus:ring-0 placeholder:text-muted-foreground/50"
                    />

                    {/* Suggestions Dropdown */}
                    {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 z-50 w-full mt-2 bg-popover text-popover-foreground rounded-lg border border-border shadow-lg max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                            {filteredSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion.name}
                                    type="button"
                                    onClick={() => addTag(suggestion.name)}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted font-medium flex items-center gap-2 transition-colors"
                                >
                                    <TagIcon className="w-3 h-3 opacity-50" />
                                    {suggestion.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 px-1">
                <span className="bg-muted px-1.5 py-0.5 rounded text-foreground border border-border">Enter</span> to add
            </p>
        </div>
    );
}
