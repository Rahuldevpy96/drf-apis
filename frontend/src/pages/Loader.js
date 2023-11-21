import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Loader() {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const session = ''
                if (session) {
                    Cookies.set('isAuthenticated', 'true');
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
                navigate("/login");
            }
        }

        checkAuthStatus();
    }, [navigate]);

    return (
        <div style={{ background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {/* <img alt="loader" src={LoaderImg} /> */}
            <div className="snippet" style={{paddingLeft: '20px'}} data-title="loader-dot-falling">
                <div className="stage">
                    <div className="loader-dot-falling"></div>
                </div>
            </div>
        </div>
    );

}