import React, { useContext, useEffect, useMemo } from "react";
import styled from 'styled-components';
import { DataContext } from "../context/Datacontext";
import { memo } from "react";

export default React.memo(() => {

    const { configs, setConfigs } = useContext(DataContext);
    
    const cat = configs.category;

    

    const WidgetCategoriesElem = styled.div`
        margin:1rem 0 0;
        padding: 1rem;
        background-color: white;
        border-radius: 0.625rem;
        display: flex;
        flex-wrap: wrap;
        width: 15.9375rem;
        height: 11.125rem;
        align-content: start;
        @media only screen and (min-width:48rem){
                margin: 0 0.63rem 0 0;
        }
        @media only screen and (min-width:90rem){
                margin:1rem 0 0;
        }
    `

    const Categoryitem = styled.div`
        border-radius: 0.625rem;
        background-color:var(--clr-bg);
        padding: 0.31rem 1rem;
        height: 1.875rem;
        margin: 0.8rem 0.5rem 0 0;
        color:var(--clr-secondary);
        font-size: 0.8125rem;
        font-weight: var(--fw-semibold);
        &.selected{
            background-color: var(--clr-secondary);
            color:white;
        }
    `

    function HandleCategory(e) {
        const nodesCat = document.querySelector(".categories_container").children;
        for (const elem of nodesCat) { elem.classList.remove("selected") }
        //e.target.classList.add("selected");
        const newArr = { category: e.target.innerText, sort: 'mostupvotes' }

        setConfigs(newArr);
    }

    useEffect(() => {
        const nodesCat = document.querySelector(".categories_container").children;
        for (const elem of nodesCat) {
            if (elem.innerText.toLowerCase() == cat)
                elem.classList.add("selected");
        }
    }, [configs])

    return (
        <WidgetCategoriesElem className="categories_container" onClick={HandleCategory}>
            <Categoryitem >All</Categoryitem>
            <Categoryitem >UI</Categoryitem>
            <Categoryitem >UX</Categoryitem>
            <Categoryitem >Enhancement</Categoryitem>
            <Categoryitem >Bug</Categoryitem>
            <Categoryitem >Feature</Categoryitem>
        </WidgetCategoriesElem>
    )
})

