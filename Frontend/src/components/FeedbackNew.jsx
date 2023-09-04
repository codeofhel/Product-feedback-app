import React, { useContext } from "react";
import Goback from "./Goback";
import { styled } from "styled-components";
import '../components/CSScomponents/newFeed.css';
import newfeed from '../assets/icon-new-feedback.svg';
import { DataContext } from "../context/Datacontext";

export default () => {
    const {data,setData} = useContext(DataContext);
    
    function HandlerSubmit(e) {
        e.preventDefault();
        const form = document.querySelector("#form");
        const formData = new FormData(form);
        console.log(formData);
        
        fetch('http://localhost:5000/createsuggestion', { method: "POST", body: formData })
            .then(response => response.json())
            .then(obj => {
                const newObj = obj['newObj'];
                console.log(data);
                const newData = [...data.data, newObj ];
                setData({ data: newData });
            });//setData({...data,newValue})
        
    }

    const ContainerNewFeed = styled.div`
        position: fixed;
        height: 100%;
        width: max(23.438rem,100%);
        display: none;
        z-index: 99999;
        background-color: var(--clr-bg);
        overflow: scroll;
        flex-direction: column;
        align-items: center;
        /* @media only screen and (min-width:48rem){

        } */
    `

    return (
        <ContainerNewFeed className='newFeed'>
            <div className="frameDetail">
                <div className="containerBtn">
                    <Goback popup='newFeed'></Goback>
                </div>
                <div className="boxFeedback newFeedBox">
                    <div className="iconNewFeed">
                        <img src={newfeed} alt="Add Feed" width="40" />
                    </div>
                    <h3 >Create New Feedback</h3>
                    <form onSubmit={HandlerSubmit} id="form">
                        <div className="newFeedItem">
                            <label for="feedtitle">Feedback Title</label>
                            <p>Add a short, descriptive headline</p>
                            <input type="text" name="title" id="feedtitle" />
                        </div>
                        <div className="newFeedItem">
                            <label for="category">Category</label>
                            <p>Choose a category for your feedback</p>
                            <select name="category" id="category">
                                <option value="feature">Feature</option>
                                <option value="ui">UI</option>
                                <option value="ux">UX</option>
                                <option value="enhancement">Enhancement</option>
                                <option value="bug">Bug</option>
                            </select>
                        </div>
                        <div className="newFeedItem">
                            <label for="feedDetail">Feedback Detail</label>
                            <p>Include any specific comments on what should be improved, added, etc.</p>
                            <textarea name="content" id="feedDetail" cols="30" rows="10"></textarea>
                        </div>
                        <div>
                            <button className="boxBtn addFeed" type="submit">Add Feedback</button>
                            <button className="boxBtn cancelbtn">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </ContainerNewFeed>
    )
}