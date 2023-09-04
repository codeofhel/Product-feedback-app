import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { DataContext } from "../context/Datacontext";

export default () => {
    const { data, statusProps } = useContext(DataContext);
    const WidgetRoadmap = styled.div`
        margin: 1.5rem 0 0;
        padding: 1.5rem;
        background-color: white;
        border-radius: 0.625rem;
        font-size: 0.85rem;
        width: 15.9375rem;
        @media only screen and (min-width:48rem){
                margin: 0;
        }
        @media only screen and (min-width:90rem){
                margin: 1.5rem 0 0;
        }
    `
    
    
    return (
        <WidgetRoadmap className="roadmap_container">
            <div>
                <h2>Roadmap</h2>
                <Link to='/roadmap'>View</Link>
            </div>
            <div>
                <ul>
                    {statusProps?.map((val) => {
                        return <li>{val}{data.data?.filter((elem, i) => elem.updateState == val).length}</li>
                    })}
                </ul>
            </div>
        </WidgetRoadmap>
    )
}