import React from 'react';

const Header = ({ title, onCreateNote }) => {
    return (
        <div className="page-header">
            <div className="header-content">
                <h1 className="page-title">{title}</h1>
                <div className="header-actions">
                    <button
                        className="btn btn-primary create-btn"
                        onClick={onCreateNote}
                    >
                        <span className="btn-icon">+</span>
                        Create Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
