import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default ({ page, popup, hide }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    function navFunc() {
        if (location.pathname.includes('roadmap'))
            navigate(page);
        else{
            document.querySelector(`.${popup}`).style.display = 'none';
            if (hide)
                hide(false);
        }
    }
    
    return (
        <div className="header-first-col columnFlex">
            <button className="navBack" onClick={navFunc}>
                <span></span>
                <p>Go Back</p>
            </button>
            {location.pathname.includes('roadmap') ?
                <div className="pageTitle">
                    <h3>Roadmap</h3>
                </div>
            :
                null
            } 
        </div>
    )
}