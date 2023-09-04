import React, { useEffect } from "react";
import "../layout/CSS/Header.css";
import { styled } from "styled-components";


export default () => {

    function OpenMobileMenu() {
        const widgetsContainer = document.querySelector('.dt_widgets');
        const headerIconContainer = document.querySelector('.header-icon-container');
        headerIconContainer.toggleAttribute('expanded');
        if (headerIconContainer.hasAttribute('expanded'))
            headerIconContainer.querySelector('.material-symbols-outlined').textContent = 'close';
        else
            headerIconContainer.querySelector('.material-symbols-outlined').textContent = 'menu'
        widgetsContainer.classList.toggle('show');
    }
    
    const HeaderContainer = styled.div`
        @media only screen and (min-width:48rem){
            padding: 1.5rem;
            border-radius: 0.625rem;
        }
    `

    return (

        <HeaderContainer className="header-container">
            <div className="header-titles">
                <h2 className="title">Frontend Mentor</h2>
                <p className="subtitle">Feedback Board</p>
            </div>
            <div className="header-icon-container" onClick={OpenMobileMenu} aria-expanded='false'>
                <a href="javascript:void(0)" className="header-icon">
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </a>
            </div>
        </HeaderContainer>

    )
}