import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, onSearch]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div className="search-bar">
            <div className="search-input-container">
                <div className="search-icon"></div>
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="search-input"
                />
                {searchTerm && (
                    <button
                        type="button"
                        className="clear-search"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
