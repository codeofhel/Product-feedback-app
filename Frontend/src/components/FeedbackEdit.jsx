import React, { useContext } from "react";
import editFeed from '../assets/icon-edit-feedback.svg';
import '../components/CSScomponents/newFeed.css';
import { styled } from "styled-components";
import Goback from "./Goback";
import {DataContext} from "../context/Datacontext";

export default () => {
    const { data, setData } = useContext(DataContext);
    
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
    function updateSuggestion(e) {
        e.preventDefault();
        const form = document.querySelector('#editForm');
        const formData = new FormData(form);
        const containerEdit = document.querySelector('.editFeedback');
        const idSuggestion = containerEdit.getAttribute('idSuggestion');
        fetch(`http://localhost:5000/updatesuggestion/${idSuggestion}`, { method: "PUT", body: formData })
            .then(response => response.json())
            .then(dataInfo => {
                
                const newData = data.data.map((val,index) => {
                    if (val._id == dataInfo.objUpdated.id)
                        return dataInfo[index] = dataInfo.objUpdated;
                    else
                        return val;
                })
                console.log(newData)
                setData({ data: newData });
            })
        
        //é preciso adicionar no dataContext
    }

    function deleteSuggestion(e) {
        e.preventDefault();
        const containerEdit = document.querySelector('.editFeedback');
        const idSuggestion = containerEdit.getAttribute('idSuggestion');
        fetch(`http://localhost:5000/deletesuggestion/${idSuggestion}`, { method: "DELETE" })
            .then(response => response.json())
            .then(dataBack => {
                const idDeleted = dataBack.objDeleted;
                const idx = data.data.findIndex((val) => {
                    return val._id == idDeleted;
                })
                data.data.splice(idx, 1);
                setData({ data: data.data });
            })
    }
    
    return (
        <ContainerNewFeed className='editFeedback'>
            <div className="frameDetail">
                <div className="containerBtn">
                    <Goback popup='editFeedback'></Goback>
                </div>
                <div className="boxFeedback">
                    <div className="iconNewFeed">
                        <img src={editFeed} alt="Add Feed" width="40" />
                    </div>
                    <h3>Editing ‘Add a dark theme option’</h3>
                    <form action="" id="editForm">
                        <div className="newFeedItem">
                            <label for="feedTtitle">Feedback Title</label>
                            <p>Add a short, descriptive headline</p>
                            <input type="text" name="title" id="feedTtitle" />
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
                        <div className="updateStatus">
                            <label for="status">Update Status</label>
                            <p>Change feature state</p>
                            <select name="updateState" id="status">
                                <option value="planned">Planned</option>
                                <option value="inprogress">In-Progress</option>
                                <option value="live">Live</option>
                            </select>
                        </div>
                        <div className="newFeedItem">
                            <label for="feedDetail">Feedback Detail</label>
                            <p>Include any specific comments on what should be improved, added, etc.</p>
                            <textarea name="content" id="feedDetail" cols="30" rows="10"></textarea>
                        </div>
                        <div>
                            <button className="boxBtn addFeed" onClick={updateSuggestion}>Edit Feedback</button>
                            <button className="boxBtn cancelbtn" >Cancel</button>
                            <button className="boxBtn deletebtn" onClick={deleteSuggestion}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </ContainerNewFeed>
    )
}