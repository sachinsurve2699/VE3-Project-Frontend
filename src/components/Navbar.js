import React from 'react';

function Navbar({ isUserLoggedIn }) {
    var loggedInUserName = sessionStorage.getItem('username');

    function logout() {
        sessionStorage.removeItem("isUserLoggedIn");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("userid");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
            <div className="container">
                {isUserLoggedIn === "true" ? (
                    <a className="navbar-brand text-white" href="/">Dashboard</a>
                ) : (
                    <a className="navbar-brand text-white" href="/login">Welcome to Task Management Web Application</a>
                )}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {isUserLoggedIn === "true" ? (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {loggedInUserName}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/login" onClick={logout}>Logout</a>
                                </div>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <a className="nav-link" href="#"></a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
