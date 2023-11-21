import Cookies from "js-cookie";
import React from "react";

function Topbar() {
    const user = Cookies.get('user');
    return (
        <div className="topbar_nav_item">
            <div className="logo">

            </div>
            <ul className="top_nav_list">
                <div className="user">
                    <p>{user?.email}</p>
                </div>
            </ul>
        </div>
    );
}

export default Topbar;
