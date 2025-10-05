import { Outlet, Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
    return (
         <>
            <nav style={{height: "60px", backgroundColor: "#343541", display: "flex", justifyContent: "center", gap: "50px"}}>
                <Link to="/home" style={{color: "#FFFFFF", padding:"10px", fontSize: "20px", textDecoration: "none"}}>Home</Link><br></br>
                <Link to="/about" style={{color: "#FFFFFF", padding:"10px", fontSize: "20px", textDecoration: "none"}}>About</Link><br></br>
                <Link to="/movies" style={{color: "#FFFFFF", padding:"10px", fontSize: "20px", textDecoration: "none"}}>Movies</Link><br></br>
            </nav>
            <Outlet />
        </>
    )
}

export default Header;