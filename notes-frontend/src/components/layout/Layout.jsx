import React from 'react';

const Layout = ({ children }) => {
    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="layout">
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <h1 className="logo">Notes App</h1>
                        <div className="current-date">
                            {getCurrentDate()}
                        </div>
                    </div>
                </div>
            </header>
            <main className="main">
                <div className="container">
                    {children}
                </div>
            </main>
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2025 Notes App. Built with React & Spring Boot.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
