import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FcDocument, FcMindMap, FcPrivacy } from "react-icons/fc";
import { Link } from "react-router-dom";

function Home() {
    const [isActive, setIsActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to toggle the class
    const toggleClass = () => {
        setIsActive(!isActive); // Toggle the state
        setIsMenuOpen(!isMenuOpen);
    };

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    const web_navbar = `web_navbar ${isSticky ? "sticky" : ""}`;

    return (
        <>
            <div className={web_navbar}>
                <div className="container">
                    <h2>this home page</h2>
                </div>
            </div>

            <div className="main">
            </div>
        </>
    );
}

export default Home;
