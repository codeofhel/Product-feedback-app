import React from "react";
import "./CSS/categoriestabs.css";

export default () => {
    return (
        <div className="containerTabs">
            <div className="itemTab">
                <p>Planned (2)</p>
            </div>
            <div className="itemTab">
                <p>In-Progress (3)</p>
            </div>
            <div className="itemTab">
                <p>Live (1)</p>
            </div>
        </div>
    )
}